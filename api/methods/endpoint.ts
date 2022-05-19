import join from 'url-join'

type Endpoint<T extends string> = `{{API_ROOT}}/${T}`
function make<T extends string>(path: T): Endpoint<T> {
  return join(process.env.NEXT_PUBLIC_API_ROOT, path) as Endpoint<T>
}

const Endpoints = {
  LOGIN: make('login'),

  STUDENT_REGISTER: make('register/student'),
}

export default Endpoints
