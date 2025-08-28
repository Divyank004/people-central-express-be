import swaggerJSDoc from "swagger-jsdoc";
import { version } from "../../package.json";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "People Central API",
      version: version,
      description: "API documentation for People Central Express Backend",
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://api.peoplecentral.com"
            : "http://localhost:3000",
        description:
          process.env.NODE_ENV === "production"
            ? "Production server"
            : "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        VacationType: {
          type: "string",
          enum: ["PAID", "UNPAID", "SICK", "PENDING", "MATERNITY"],
          description: "Type of vacation",
        },
        VacationStatus: {
          type: "string",
          enum: ["PENDING", "APPROVED", "REJECTED"],
          description: "Status of vacation request",
        },
        Vacation: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier for the vacation",
            },
            startDate: {
              type: "string",
              format: "date",
              description: "Start date of vacation",
            },
            endDate: {
              type: "string",
              format: "date",
              description: "End date of vacation",
            },
            document: {
              type: "string",
              description: "Document associated with vacation (optional)",
            },
            comments: {
              type: "string",
              description: "Comments for vacation request (optional)",
            },
            duration: {
              type: "string",
              description: "Duration of vacation in days",
            },
            vacationType: {
              $ref: "#/components/schemas/VacationType",
            },
            status: {
              $ref: "#/components/schemas/VacationStatus",
            },
          },
          required: [
            "id",
            "startDate",
            "endDate",
            "duration",
            "vacationType",
            "status",
          ],
        },
        VacationRequest: {
          type: "object",
          properties: {
            startDate: {
              type: "string",
              format: "date",
              description: "Start date of vacation request",
            },
            endDate: {
              type: "string",
              format: "date",
              description: "End date of vacation request",
            },
            document: {
              type: "string",
              description: "Document associated with vacation (optional)",
            },
            vacationType: {
              $ref: "#/components/schemas/VacationType",
            },
            comments: {
              type: "string",
              description: "Comments for vacation request (optional)",
            },
            halfDay: {
              type: "boolean",
              description: "Whether this is a half-day vacation (optional)",
            },
            replacementId: {
              type: "number",
              description: "ID of replacement employee (optional)",
            },
          },
          required: ["startDate", "endDate", "vacationType"],
        },
        VacationsCount: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "Unique identifier",
            },
            vacationType: {
              type: "string",
              description: "Type of vacation",
            },
            noOfDaysTaken: {
              type: "number",
              description: "Number of days taken for this vacation type",
            },
          },
          required: ["id", "vacationType", "noOfDaysTaken"],
        },
        LoginRequest: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "Username for authentication",
            },
            password: {
              type: "string",
              description: "Password for authentication",
            },
          },
          required: ["username", "password"],
        },
        RegisterRequest: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "Username for registration",
            },
            password: {
              type: "string",
              description: "Password for registration",
            },
          },
          required: ["username", "password"],
        },
        AuthResponse: {
          type: "object",
          properties: {
            access_token: {
              type: "string",
              description: "JWT access token",
            },
            userId: {
              type: "number",
              description: "User ID",
            },
          },
          required: ["access_token", "userId"],
        },
        User: {
          type: "object",
          properties: {
            userId: {
              type: "number",
              description: "User ID",
            },
            employeeId: {
              type: "number",
              description: "Employee ID",
            },
            userName: {
              type: "string",
              description: "Username",
            },
            name: {
              type: "string",
              description: "Full name of the user",
            },
            orgName: {
              type: "string",
              description: "Organization name",
            },
            employeeRole: {
              type: "string",
              description: "Employee role/position",
            },
            noVacationDaysLeft: {
              type: "number",
              description: "Number of vacation days left",
            },
          },
          required: ["userId", "userName"],
        },
        Error: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "Error message",
            },
          },
          required: ["message"],
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
