import {
  DefaultBodyType,
  MockedRequest,
  PathParams,
  ResponseComposition,
  rest,
  RestContext,
  RestHandler,
  RestRequest,
} from "msw";
import { setupServer } from "msw/node";

type TestServerConfigs = {
  path: string;
  method: "get";
  res: (
    req: RestRequest<never, PathParams<string>>,
    res: ResponseComposition<DefaultBodyType>,
    ctx: RestContext
  ) => RestHandler<MockedRequest<DefaultBodyType>>;
}[];

/** createServer receives a TestServerConfigs array and creates an isolated msw server configuration for each test file / describe block */
export const createServer = (configs: TestServerConfigs) => {
  // creates an array of msw handlers from the given config array
  const handlers = configs.map((config) => {
    const { method = "get", path } = config;

    return rest[method](path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
};
