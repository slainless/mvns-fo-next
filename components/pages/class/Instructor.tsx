import { Avatar } from '@Components/Avatar'
import { Flex } from '@Components/Flex'
import { Box } from '@Components/Box'
import { Text } from '@Components/Text'
import { TitledSection } from '@Components/TitledSection'
import { Paragraph } from '@Components/Paragraph'

export default function Instructor() {
  return (
    <TitledSection
      title="Instructor"
      size="2"
      css={{
        pt: '$7',
      }}
    >
      <Flex
        css={{
          gap: '$6',
          ai: 'center',
          mb: '$5',
        }}
      >
        <Avatar size="6" fallback="F" src="/media/avatar (2).png"></Avatar>
        <Box>
          <Text
            size="6"
            css={{
              fontWeight: '$bold',
              mb: '$1',
            }}
          >
            Uwuis Zainal
          </Text>
          <Text
            // size="6"
            css={{
              color: '$slate11',
            }}
          >
            Hosted on mavensdotlive since 2022
          </Text>
        </Box>
      </Flex>
      <Paragraph
        css={{
          maxWidth: '60ch',
        }}
      >
        Pg Muhd Uwuis Al Qarni is a certified Professional Scrum Master, Product
        Owner and a Business Coach with his vast experience mainly in Software
        Development Projects. He is keen to support the community in coaching
        startups with their product designs and business model.
      </Paragraph>
    </TitledSection>
  )
}
