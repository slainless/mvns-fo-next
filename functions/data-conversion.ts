import { BlogCardData } from '@Components/BlogCard'
import { CourseCardData } from '@Components/CourseCard'
import { Blog, BlogResponse } from '@Models/blog'
import { Course, CourseResponse } from '@Models/course'
import { isEmpty } from 'lodash-es'
import { nanoid } from 'nanoid'
import { formatISODate } from './format-date'

function $courseToCard(course: Course): CourseCardData {
  return {
    itemId: course.id,
    title: course.title,
    badges: [
      { display: course.type, href: '' },
      { display: course.category, href: '' },
    ],
    isFavorited: course.is_wishlist,
    price: course.prices?.[0]?.price.toString(),
    date: formatISODate(course.course_datetime) ?? '',
    backgroundUrl: course.image,
  }
}

function $blogToCard(blog: Blog): BlogCardData {
  return {
    itemId: blog.id,
    title: blog.title,
    backgroundUrl: `https://picsum.photos/800?rand=${nanoid(10)}`,
    date: formatISODate(blog.updated_at) ?? '',
  }
}

export function courseToCard(
  course: Course | CourseResponse.GetOne
): CourseCardData
export function courseToCard(
  courses: Course[] | CourseResponse.Get
): CourseCardData[]
export function courseToCard(
  course: Course | CourseResponse.Get | Course[] | CourseResponse.GetOne
): CourseCardData | CourseCardData[] {
  const isMany = course instanceof CourseResponse.Get
  const isArray = Array.isArray(course)

  if (isMany || isArray) {
    const courses = isArray ? course : course.data
    return courses.map($courseToCard)
  }

  return $courseToCard(
    course instanceof CourseResponse.GetOne ? course.data : course
  )
}

export function blogToCard(blog: Blog | BlogResponse.GetOne): BlogCardData
export function blogToCard(blogs: Blog[] | BlogResponse.Get): BlogCardData[]
export function blogToCard(
  blog: Blog | BlogResponse.Get | Blog[] | BlogResponse.GetOne
): BlogCardData | BlogCardData[] {
  const isMany = blog instanceof BlogResponse.Get
  const isArray = Array.isArray(blog)

  if (isMany || isArray) {
    const blogs = isArray ? blog : blog.data
    return blogs.map($blogToCard)
  }

  return $blogToCard(blog instanceof BlogResponse.GetOne ? blog.data : blog)
}
