import { Box } from '@Components/Box'
import { Flex } from '@Components/Flex'
import { Grid } from '@Components/Grid'
import { Link } from '@Components/Link'
import { Text } from '@Components/Text'
import { Heading } from '@Components/Heading'
import { Icon } from '@Components/Icon'
import {
  SiTiktok,
  SiFacebook,
  SiYoutube,
  SiInstagram,
  SiLinkedin,
} from 'react-icons/si'
import {
  FaTiktok,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa'
import { styled } from '@Theme'

type ListProps = ReactProps<typeof Flex> & {
  title: string
  items?: {
    display: string
    href: string
  }[]
}
function List(props: ListProps) {
  const { title, items, ...rest } = props
  return (
    <Flex
      direction="column"
      css={{
        rowGap: '$2',
      }}
      {...rest}
    >
      <Heading
        as="h3"
        css={{
          fontSet: '$md',
          fontWeight: '$bold',
          color: '$loContrast',
          mb: '$5',
        }}
      >
        {title}
      </Heading>
      {items?.map((item, i) => (
        <Link
          href={item.href}
          key={i}
          css={{
            fontSet: '$sm',
            color: '$loContrast',
            fontFamily: '$poppins',
          }}
        >
          {item.display}
        </Link>
      ))}
    </Flex>
  )
}
const StyledList = styled(List)

export default function Footer() {
  return (
    <Box
      css={{
        width: '100%',
        backgroundColor: '$hiContrast',
      }}
    >
      <Box container="xl">
        <Grid
          css={{
            gridTemplateColumns: 'repeat(5, 1fr)',
            py: '$7',
            justifyItems: 'center',
            mb: '$7',
          }}
        >
          <StyledList
            title="Mavensdotlive"
            items={[
              { display: 'About Us', href: '' },
              { display: 'For Business', href: '' },
              { display: 'Become a Partner', href: '' },
              { display: 'Become an Instructor', href: '' },
              { display: 'Careers', href: '' },
            ]}
          />
          <StyledList
            title="Classes"
            css={{
              gridColumn: '2/5',
            }}
            items={[
              { display: 'Online', href: '' },
              { display: 'Physical', href: '' },
              { display: 'Video', href: '' },
              { display: 'Certification', href: '' },
            ]}
          />
          <StyledList
            title="More"
            items={[
              { display: 'FAQs', href: '' },
              { display: 'Terms', href: '' },
              { display: 'Privacy', href: '' },
              { display: 'Blog', href: '' },
              { display: 'Sitemap', href: '' },
              { display: 'Contact', href: '' },
            ]}
          />
        </Grid>
        <Flex
          css={{
            jc: 'space-between',
            ai: 'center',
            py: '$5',
            borderTop: '1px solid $colors$slate12',
          }}
        >
          <Text
            size="2"
            css={{
              color: '$slate11',
            }}
          >
            © 2022, Mavensdotlive Sdn Bhd. All right reserved.
          </Text>
          <Flex
            css={{
              columnGap: '$2',
              [`& ${Icon}`]: {
                width: '$4',
                height: '$4',
                color: '$slate11',

                '& path': {
                  strokeWidth: 0,
                },
              },
            }}
          >
            <Icon>
              <SiTiktok />
            </Icon>
            <Icon>
              <SiFacebook />
            </Icon>
            <Icon>
              <SiYoutube />
            </Icon>
            <Icon>
              <SiInstagram />
            </Icon>
            <Icon>
              <SiLinkedin />
            </Icon>
            {/* <Icon>
              <FaTiktok />
            </Icon>
            <Icon>
              <FaFacebook />
            </Icon>
            <Icon>
              <FaYoutube />
            </Icon>
            <Icon>
              <FaInstagram />
            </Icon>
            <Icon>
              <FaLinkedin />
            </Icon> */}
          </Flex>
        </Flex>
      </Box>
    </Box>
  )
}
