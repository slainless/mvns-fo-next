import { forwardRef, ElementRef, ComponentProps, useMemo } from 'react'
import { nanoid } from 'nanoid'

export const DynamicStarIcon = forwardRef<
  ElementRef<'svg'>,
  ComponentProps<'svg'>
>((props, ref) => {
  const id = useMemo(() => nanoid(10), [])
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      fill="none"
      viewBox="0 0 15 15"
      ref={ref}
      {...props}
    >
      <defs>
        <clipPath id={`clipper-static-${id}`}>
          <rect y="0" width="15" height="15" x="0" />
        </clipPath>
        <clipPath id={`clipper-dynamic-${id}`}>
          <rect
            y="0"
            height="15"
            style={{
              x: 'var(---clipX, 0)',
              width: 'var(---clipWidth, 15)',
            }}
          />
        </clipPath>
      </defs>
      <path
        fill="var(---staticFill, white)"
        clipPath={`url(#clipper-static-${id})`}
        d="M7.223.666a.3.3 0 01.554 0L9.413 4.6a.3.3 0 00.253.184l4.248.34a.3.3 0 01.171.528L10.85 8.424a.3.3 0 00-.097.297l.99 4.145a.3.3 0 01-.45.326L7.657 10.97a.3.3 0 00-.312 0l-3.637 2.222a.3.3 0 01-.448-.326l.989-4.145a.3.3 0 00-.097-.297L.915 5.652a.3.3 0 01.171-.527l4.248-.34a.3.3 0 00.253-.185L7.223.666z"
      ></path>
      <path
        fill="var(---dynamicFill, white)"
        clipPath={`url(#clipper-dynamic-${id})`}
        d="M7.223.666a.3.3 0 01.554 0L9.413 4.6a.3.3 0 00.253.184l4.248.34a.3.3 0 01.171.528L10.85 8.424a.3.3 0 00-.097.297l.99 4.145a.3.3 0 01-.45.326L7.657 10.97a.3.3 0 00-.312 0l-3.637 2.222a.3.3 0 01-.448-.326l.989-4.145a.3.3 0 00-.097-.297L.915 5.652a.3.3 0 01.171-.527l4.248-.34a.3.3 0 00.253-.185L7.223.666z"
      ></path>
      {/*<path*/}
      {/*  fill="red"*/}
      {/*  fillRule="evenodd"*/}
      {/*  d="M6.98 1.252l-.022.05L5.588 4.6a.3.3 0 01-.253.184l-3.561.286-.055.004-.331.027-.3.024a.3.3 0 00-.172.527l.23.196.252.216.041.036 2.713 2.324a.3.3 0 01.097.297l-.83 3.475-.012.053-.077.323-.07.294a.3.3 0 00.448.326l.258-.158.284-.173.046-.028 3.049-1.863a.3.3 0 01.312 0l3.049 1.863.046.028.284.173.258.158a.3.3 0 00.448-.326l-.07-.293-.077-.324-.013-.053-.829-3.475a.3.3 0 01.097-.297L13.562 6.1l.041-.036.253-.216.23-.196a.3.3 0 00-.172-.527l-.3-.024-.332-.027-.055-.004-3.56-.286a.3.3 0 01-.254-.184L8.042 1.302l-.021-.05-.128-.307-.116-.279a.3.3 0 00-.554 0l-.116.279-.128.307zm.52 1.352l-.99 2.38a1.3 1.3 0 01-1.096.797l-2.57.206 1.958 1.677a1.3 1.3 0 01.418 1.29l-.598 2.507 2.2-1.344a1.3 1.3 0 011.356 0l2.2 1.344-.598-2.508a1.3 1.3 0 01.418-1.289l1.958-1.677-2.57-.206a1.3 1.3 0 01-1.096-.797l-.99-2.38z"*/}
      {/*  clipRule="evenodd"*/}
      {/*></path>*/}
    </svg>
  )
})
DynamicStarIcon.displayName = 'DynamicStarIcon'

export default DynamicStarIcon
