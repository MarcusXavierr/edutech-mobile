import { getAllCourses } from '@/services/course.service'
import { errorToast, successToast } from '@/utils/toast'
import { create } from 'zustand'

export const useCourseStore = create<CourseStore>((set, get) => ({
  isLoading: false,
  courses: [],
  setCourses: (courses) => set({courses}),
  loadCourses: async () => {
    set({isLoading: true})
    const res = await getAllCourses()
    console.log('res', res)
    if (res.success) {
      set({courses: res.data})
      successToast('Courses loaded successfully')
    } else {
      errorToast(res.error.userMessage)
    }
    set({isLoading: false})
  },
  getCourseById: (id: number) => {
    const { courses } = get()
    return courses.find(course => course.id === id)
  },
  // TODO: Reescrever de forma mais performática
  getLessonById: (id: number) => {
    const { courses } = get()
    for (const course of courses) {
      for (const lesson of course.lessons) {
        if (lesson.id === id) return lesson
      }
    }
  },
}))

type CourseStore = {
  isLoading: boolean,
  courses: Course[],
  setCourses: (courses: Course[]) => void,
  loadCourses: () => Promise<void>,
  getCourseById: (id: number) => Course | undefined
  getLessonById: (id: number) => Lesson | undefined
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

