import path from "path";

import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PROTO_PATH = path.join(
  process.cwd(),
  "backend",
  "app",
  "proto",
  "glossary.proto"
);

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition) as {
  glossary: {
    v1: {
      GlossaryService: grpc.ServiceClientConstructor;
    };
  };
};

let client: grpc.Client | null = null;

export const getGlossaryClient = (): grpc.Client => {
  if (!client) {
    const address = process.env.GLOSSARY_GRPC_URL ?? "localhost:8000";
    client = new protoDescriptor.glossary.v1.GlossaryService(
      address,
      grpc.credentials.createInsecure()
    );
  }

  return client;
};

export type GrpcError = grpc.ServiceError;
