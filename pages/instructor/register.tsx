import type { NextPage } from 'next'
import { TitledSection } from '@Components/TitledSection'
import Identity from '@Pages/instructor/register-form/Identity'
import SocialMedia from '@Pages/instructor/register-form/SocialMedia'
import WorkExperience from '@Pages/instructor/register-form/WorkExperience'
import Expertise from '@Pages/instructor/register-form/Expertise'
import * as BaseTabs from '@Components/Tabs'
import { styled } from '@Theme'

const TabsTrigger = styled(BaseTabs.TabsTrigger, {
  py: '$2',
  border: 'none',
  '&[data-state="active"]': {
    boxShadow:
      'inset 1px 0 0 0 rgba(0,0,0,.1), inset 0 1px 0 0 rgba(0,0,0,.1), inset 0 -1px 0 0 rgba(0,0,0,.1)',
  },
  '&:focus': {
    boxShadow: 'inset 0 0 0 1px $colors$slate8, 0 0 0 1px $colors$slate8',
  },

  defaultVariants: {
    size: '2',
  },
})
const TabsContent = styled(BaseTabs.TabsContent, {
  p: '$6',
})
const Page: NextPage = () => {
  return (
    <TitledSection
      title="Register to become an Instructor"
      headingProps={{
        css: {
          mx: 'auto',
          mb: '$6',
        },
      }}
    >
      <BaseTabs.Tabs
        className="group"
        orientation="vertical"
        defaultValue="identity"
        css={{
          maxWidth: '$4xl',
          mx: 'auto',
        }}
      >
        <BaseTabs.TabsList
          css={{
            '& > :first-child': {
              borderTopLeftRadius: '$3',
            },
            '& > :last-child': {
              borderBottomLeftRadius: '$3',
            },
          }}
        >
          <TabsTrigger value="identity">Personal Identity</TabsTrigger>
          <TabsTrigger value="social-media">Social Media</TabsTrigger>
          <TabsTrigger value="work-experience">Work Experience</TabsTrigger>
          <TabsTrigger value="expertise">Expertise</TabsTrigger>
        </BaseTabs.TabsList>
        <TabsContent value="identity">
          <Identity />
        </TabsContent>
        <TabsContent value="social-media">
          <SocialMedia />
        </TabsContent>
        <TabsContent value="work-experience">
          <WorkExperience />
        </TabsContent>
        <TabsContent value="expertise">
          <Expertise />
        </TabsContent>
      </BaseTabs.Tabs>
    </TitledSection>
  )
}

export default Page
