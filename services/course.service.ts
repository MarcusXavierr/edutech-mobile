import { failure, Result, success } from '@/types/result'
import httpApi from './httpApi'
import { HttpError } from '@/types/http-error'
import { Course } from '@/store/course'

export const getAllCourses = (): Promise<Result<Course[], HttpError>> => {
  return httpApi.get("/courses")
      .then(res => success(res.data))
      .catch((error: HttpError) => failure(error))
}
