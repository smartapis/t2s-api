import * as fs from "fs";

let files: string[] = fs.readdirSync(__dirname);
files = files.filter((f) => f.indexOf(".routes.") > -1);

let routesTypeInfo: Array<any> = [];

export default async function (fastify, opts, done) {
  files.map((f, i) => {
    import(__dirname + "/" + f).then((routes) => {
      routes.default.map((r) => {
        fastify.route(r);

        routesTypeInfo.push(
          (({ method, url, type }) => ({ method, url, type }))(r)
        );

        if (i === files.length - 1) done();
      });
    });
  });
}

export const isPublicRoute = function (url: string, method: string): boolean {
  return routesTypeInfo.some((r) => r.url === url && r.method === method && r.type === 'public');
};

export const isProtectedRoute = function (url: string, method: string): boolean {
  return routesTypeInfo.some((r) => r.url === url && r.method === method && r.type === 'protected');
};
