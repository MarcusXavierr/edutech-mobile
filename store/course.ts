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
    if (res.success) {
      set({courses: res.data})
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

  /**
   * Gets the course that contains a specific lesson
   */
  getCourseByLessonId: (lessonId: number) => {
    const { courses } = get()
    for (const course of courses) {
      if (course.lessons.some(lesson => lesson.id === lessonId)) {
        return course
      }
    }
  },

  /**
   * Gets navigation info for a lesson (previous and next lessons in the same course)
   */
  getLessonNavigation: (lessonId: number) => {
    const { courses } = get()
    for (const course of courses) {
      const lessonIndex = course.lessons.findIndex(lesson => lesson.id === lessonId)
      if (lessonIndex !== -1) {
        const previousLesson = lessonIndex > 0 ? course.lessons[lessonIndex - 1] : null
        const nextLesson = lessonIndex < course.lessons.length - 1 ? course.lessons[lessonIndex + 1] : null
        return {
          course,
          currentIndex: lessonIndex,
          totalLessons: course.lessons.length,
          previousLesson,
          nextLesson
        }
      }
    }
    return null
  },
}))

type CourseStore = {
  isLoading: boolean,
  courses: Course[],
  setCourses: (courses: Course[]) => void,
  loadCourses: () => Promise<void>,
  getCourseById: (id: number) => Course | undefined
  getLessonById: (id: number) => Lesson | undefined
  getCourseByLessonId: (lessonId: number) => Course | undefined
  getLessonNavigation: (lessonId: number) => {
    course: Course
    currentIndex: number
    totalLessons: number
    previousLesson: Lesson | null
    nextLesson: Lesson | null
  } | null
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

