import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "WWT | API",
        version: "1.0",
      },
      components: {
        // Schemas

        schemas: {
          Price: {
            type: "object",
            properties: {
              id: {
                type: "string",
              },
              from: {
                type: "string",
              },
              to: {
                type: "string",
              },
              priceSheet: {
                type: "object",
                properties: {
                  adult: {
                    type: "integer",
                  },
                  student: {
                    type: "integer",
                  },
                  child: {
                    type: "integer",
                  },
                },
              },
            },
            example: {
              id: "66bdf405a86bedf043544014",
              from: "moldova",
              to: "switzerland",
              price_sheet: {
                adult: 150,
                student: 120,
                child: 80,
              },
            },
          },

          PostUser: {
            type: "object",
            properties: {
              firstname: {
                type: "string",
                description: "First name of the user",
              },
              lastname: {
                type: "string",
                description: "Last name of the user",
              },
              email: {
                type: "string",
                description: "Email address of the user",
                format: "email",
              },
              lang: {
                type: "string",
                enum: ["fr", "en", "ro", "ru"],
                description: "Language of the email",
              },
            },
            required: ["firstname", "lastname", "email", "lang"],
            example: {
              firstname: "John",
              lastname: "Doe",
              email: "john.doe@example.com",
              lang: 'en'
            },
          },

          PatchUser: {
            type: "object",
            properties: {
              firstname: {
                type: "string",
                description: "First name of the user",
              },
              lastname: {
                type: "string",
                description: "Last name of the user",
              },
              email: {
                type: "string",
                description: "Email address of the user",
                format: "email",
              },
              dob: {
                type: "string",
                description: "Date of birth of the user in YYYY-MM-DD format",
                format: "date",
              },
              phone_number: {
                type: "string",
                description: "Optional phone number of the user",
                nullable: true,
              },
            },
            required: ["firstname", "lastname", "email"],
            example: {
              firstname: "John",
              lastname: "Doe",
              email: "john.doe@example.com",
              dob: "1990-01-01",
              phone_number: "+123456789",
            },
          },

          PatchTravel: {
            type: "object",
            properties: {
              id: { type: "string", example: "abc123" },
              departure: { type: "string", format: "date-time", example: "2023-08-15T10:00:00Z" },
              route_id: { type: "string", example: "66bdf14adeebbbbeceb9d4e1" },
            },
            required: ["id", "departure", "routeId"],
          },

          PostTravel: {
            type: "object",
            properties: {
              departure: { type: "string", format: "date-time", example: "2023-08-15T10:00:00Z" },
              route_id: { type: "string", example: "66bdf14adeebbbbeceb9d4e1" },
            },
            required: ["departure", "routeId"],
          },

          PostTravels: {
            type: "array",
            items : {
              $ref: "#/components/schemas/PostTravel",
            }
          },

          Order: {
            type: "object",
            properties: {
              travel_id: { type: "string", example: "66c0ae653bee3feb309f8f32" },
              passengers: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    firstname: { type: "string", example: "John" },
                    lastname: { type: "string", example: "Doe" },
                    price: { type: "number", example: 150 },
                  },
                  required: ["firstname", "lastname", "price"],
                },
              },
              user_id: { type: "string", example: "66bccef5e279a73cce57fe89", nullable: true },
              contact_details: {
                type: "object",
                properties: {
                  phone_number: { type: "string", example: "+1234567890" },
                  email: { type: "string", format: "email", example: "john.doe@example.com" },
                  notes: { type: "string", example: "Special requests", nullable: true },
                },
                required: ["phone_number", "email"],
              },
              lang: {
                type: "string",
                enum: ["fr", "en", "ro", "ru"],
                example: "en",
              },
            },
            required: ["travel_id", "passengers", "contact_details", "lang"],
          },
        },

        // Responses

        responses: {
          UnauthorizedResponse: {
            description: "Unauthorized - The user is not logged in",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "You must be logged in!",
                    },
                  },
                },
              },
            },
          },
          BadRequestResponse: {
            description: "Bad Request - Email not found in session",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "Email not found in session!",
                    },
                  },
                },
              },
            },
          },
          ForbiddenResponse: {
            description: "Forbidden - The user is not authorized",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    msg: {
                      type: "string",
                      example: "You are not authorized to be here!",
                    },
                  },
                },
              },
            },
          },
        },
      },

      // Paths

      paths: {

        // PRICE PATHS
        "/api/price": {
          get: {
            summary: "Returns a list of prices",
            tags: ["Price"],
            responses: {
              "401": {
                $ref: "#/components/responses/UnauthorizedResponse",
              },
              "403": {
                $ref: "#/components/responses/ForbiddenResponse",
              },
              "500": {
                description: "MongoDB query failed",
              },
              "200": {
                description: "Successfully pulled all prices",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/Price",
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: "Creates a new price object",
            tags: ["Price"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Price",
                  },
                },
              },
            },
            responses: {
              "401": {
                $ref: "#/components/responses/UnauthorizedResponse",
              },
              "403": {
                $ref: "#/components/responses/ForbiddenResponse",
              },
              "400": {
                $ref: "#/components/responses/BadRequestResponse",
              },
              "201": {
                description: "Price object created successfully!",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        msg: {
                          type: "string",
                          example: "Price object created successfully!",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          patch: {
            summary: "Update an existing price object",
            tags: ["Price"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Price",
                  },
                },
              },
            },
            responses: {
              "401": {
                $ref: "#/components/responses/UnauthorizedResponse",
              },
              "403": {
                $ref: "#/components/responses/ForbiddenResponse",
              },
              "400": {
                $ref: "#/components/responses/BadRequestResponse",
              },
              "201": {
                description: "Price object updated successfully!",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        msg: {
                          type: "string",
                          example: "Price object updated successfully!",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },

        // USER PATHS
        "/api/user": {
          post: {
            summary: "Creates a new user",
            tags: ["User"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PostUser",
                  },
                },
              },
            },
            responses: {
              "401": {
                $ref: "#/components/responses/UnauthorizedResponse",
              },
              "400": {
                $ref: "#/components/responses/BadRequestResponse",
              },
              "201": {
                description: "User created successfully!",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        msg: {
                          type: "string",
                          example: "User created successfully!",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          patch: {
            summary: "Updates an existing user",
            tags: ["User"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PatchUser",
                  },
                },
              },
            },
            responses: {
              "401": {
                $ref: "#/components/responses/UnauthorizedResponse",
              },
              "400": {
                $ref: "#/components/responses/BadRequestResponse",
              },
              "201": {
                description: "User updated successfully!",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        msg: {
                          type: "string",
                          example: "User updated successfully!",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          get: {
            summary: "Gets the current authenticated user",
            tags: ["User"],
            responses: {
              "401": {
                $ref: "#/components/responses/UnauthorizedResponse",
              },
              "400": {
                $ref: "#/components/responses/BadRequestResponse",
              },
              "200": {
                description: "Successfully got a user!",
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/PatchUser",
                    },
                  },
                },
              },
            },
          },
        },
        
        // TRAVEL PATHS
      "/api/travel": {
          post: {
            summary: "Creates a new travel record",
            tags: ["Travel"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PostTravels",
                  },
                },
              },
            },
            responses: {
              "401": { $ref: "#/components/responses/UnauthorizedResponse" },
              "403": { $ref: "#/components/responses/ForbiddenResponse" },
              "400": { $ref: "#/components/responses/BadRequestResponse" },
              "201": {
                description: "Travel created successfully!",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        msg: {
                          type: "string",
                          example: "Travel created successfully!",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          patch: {
            summary: "Updates an existing travel record",
            tags: ["Travel"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/PatchTravel",
                  },
                },
              },
            },
            responses: {
              "401": { $ref: "#/components/responses/UnauthorizedResponse" },
              "403": { $ref: "#/components/responses/ForbiddenResponse" },
              "400": { $ref: "#/components/responses/BadRequestResponse" },
              "201": {
                description: "Travel updated successfully!",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        msg: {
                          type: "string",
                          example: "Travel updated successfully!",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          get: {
            summary: "Gets a list of all travels",
            tags: ["Travel"],
            responses: {
              "401": { $ref: "#/components/responses/UnauthorizedResponse" },
              "403": { $ref: "#/components/responses/ForbiddenResponse" },
              "500": { $ref: "#/components/responses/ServerErrorResponse" },
              "200": {
                description: "Successfully retrieved all travels",
                content: {
                  "application/json": {
                    schema: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Travel" },
                    },
                  },
                },
              },
            },
          },
        },

        // ORDER PATHS
        "/api/order": {
          post: {
            summary: "Creates a new order",
            tags: ["Order"],
            requestBody: {
              required: true,
              content: {
                "application/json": {
                  schema: {
                    $ref: "#/components/schemas/Order",
                  },
                },
              },
            },
            responses: {
              "400": { $ref: "#/components/responses/BadRequestResponse" },
              "201": { $ref: "#/components/responses/SuccessResponse" },
              "500": { $ref: "#/components/responses/ServerErrorResponse" },
            },
          },
        },

      },
      security: []
    }
  });
  return spec;
};