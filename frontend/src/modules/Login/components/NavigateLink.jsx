import { Link } from 'react-router-dom'

export default function NavigateLink({route, label}) {
  return (
    <Link className='cursor-pointer text-center text-[#d87c7c] text-sm' to={route}>{label}</Link>
  )
}
