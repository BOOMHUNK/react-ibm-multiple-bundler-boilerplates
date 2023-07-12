import React from 'react'
import { Button, Content } from '@carbon/react'
import TutorialHeader from './components/TutorialHeader/TutorialHeader'

const App = (): JSX.Element => {
  return (
    <>
      <TutorialHeader />
      <Content>
        <Button>Button</Button>
      </Content>
    </>
  )
}

export default App
