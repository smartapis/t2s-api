import * as path from "path";
import fastify from "fastify";
import * as DataStore from "./datastore";

import { checkSessionID } from "./utils/middleware";
import { isPublicRoute } from "./routes";

const server = fastify({
  logger: {
    level: "info",
  },
});
server.register(require('fastify-cors'), { 
  origin : true
})

const APP_ROUTE_PREFIX: string = process.env.APP_ROUTE_PREFIX || "";
const APP_SESSION_ID_HEADER_LABEL: string =
  process.env.APP_SESSION_ID_HEADER_LABEL || "";

server.register(require("./routes"), { prefix: APP_ROUTE_PREFIX });
server.decorateRequest("session", null);
server.decorateRequest("sessionId", null);

//pre-process
server.addHook("onRequest", (request: any, reply, done) => {
  if (!request.routerPath) {
    done();
    return;
  }
  //escape documentation route
  if (request.routerPath.indexOf("/api/t2s/documentation") > -1) done();
  else {

    request.sessionId = request.headers[APP_SESSION_ID_HEADER_LABEL];
    //Populate Session Info into request
    checkSessionID(request.sessionId).then(
      (session) => {
        request.session = session;
        //Check Authenticity for non-public routes
        // Note : Identity based Authorisation shall be handled in route - hooks
        if (
          !isPublicRoute(
            request.routerPath.replace("/" + APP_ROUTE_PREFIX, ""),
            request.method
          )
        ) {
          if (!request.session) {
            reply.code(401).send();
          } else {
            done();
          }
        } else {
          done();
        }
      },
      (error) => {
        reply.code(401).send();
      }
    );
    //give the request id back to response for debugging purpose
    reply.header("r-id", request.id);
  }
});

DataStore.init().then(
  () => {
    if (require.main === module) {
      // called directly i.e. "node app"
      server.listen(Number(process.env["PORT"]), (err, address) => {
        if (err) throw err;
        server.log.info(`server listening on ${address}`);
      });
    } else {
      // required as a module => executed on aws lambda/ functions
      module.exports = server;
    }
  },
  (err) => {
    throw err;
  }
);
