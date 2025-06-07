import { getAllCourses } from '@/services/course.service'
import { errorToast, successToast } from '@/utils/toast'
import { create } from 'zustand'

export const useCourseStore = create<CourseStore>((set) => ({
  courses: [],
  setCourses: (courses) => set({courses}),
  loadCourses: async () => {
    const res = await getAllCourses()
    if (res.success) {
      set({courses: res.data})
      successToast('Courses loaded successfully')
    } else {
      errorToast(res.error.userMessage)
    }
  }
}))

type CourseStore = {
  courses: Course[],
  setCourses: (courses: Course[]) => void,
  loadCourses: () => void
}

export type Course = {
  id: number
  name: string
  description: string
  coverImgUrl: string
  lessons: Lesson[]
}

export type Lesson = {
  id: number
  name: string
  description: string
  videoUrl: string
}

