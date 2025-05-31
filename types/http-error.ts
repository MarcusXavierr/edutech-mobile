export enum HttpStatusCode {
  NETWORK_ERROR = 0,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503
}

export const HTTP_ERROR_MESSAGES: Record<HttpStatusCode, string> = {
  [HttpStatusCode.NETWORK_ERROR]: 'Erro de conexão. Verifique sua internet.',
  [HttpStatusCode.BAD_REQUEST]: 'Dados inválidos fornecidos.',
  [HttpStatusCode.UNAUTHORIZED]: 'Não autorizado. Faça login novamente.',
  [HttpStatusCode.FORBIDDEN]: 'Você não tem permissão para realizar esta ação.',
  [HttpStatusCode.NOT_FOUND]: 'Recurso não encontrado.',
  [HttpStatusCode.CONFLICT]: 'Este email já está em uso.',
  [HttpStatusCode.UNPROCESSABLE_ENTITY]: 'Dados fornecidos são inválidos.',
  [HttpStatusCode.TOO_MANY_REQUESTS]: 'Muitas tentativas. Tente novamente em alguns minutos.',
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: 'Erro interno do servidor. Tente novamente.',
  [HttpStatusCode.BAD_GATEWAY]: 'Serviço temporariamente indisponível.',
  [HttpStatusCode.SERVICE_UNAVAILABLE]: 'Serviço em manutenção. Tente novamente mais tarde.'
}

export type HttpError = {
  readonly status: number
  readonly message: string
  readonly userMessage: string
  readonly details?: unknown
  readonly timestamp: Date
}

/**
 * Gets user-friendly message for HTTP status code
 */
const getUserMessage = (status: number): string => {
  const statusCode = status as HttpStatusCode
  return HTTP_ERROR_MESSAGES[statusCode] || 'Ocorreu um erro inesperado.'
}

export const createHttpError = (
  status: number,
  message: string,
  details?: unknown,
  customUserMessage?: string
): HttpError => ({
  status,
  message,
  userMessage: customUserMessage || getUserMessage(status),
  details,
  timestamp: new Date()
})
