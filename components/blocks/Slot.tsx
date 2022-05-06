import { Slot as PrimitiveSlot } from '@radix-ui/react-slot'
import { styled } from '@Theme'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
  name?: string
}
const Slot = ({ children, name = 'default' }: Props) => {
  return <>{children}</>
}

const StyledSlot = styled(PrimitiveSlot)

export { Slot, StyledSlot }
export default Slot
