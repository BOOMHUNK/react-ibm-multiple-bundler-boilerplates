import React from 'react'
import { Button, Content } from '@carbon/react'
import MyHeader from './components/TutorialHeader/MyHeader'

const App = (): JSX.Element => {
  return (
    <>
      <MyHeader />
      <Content>
        <Button>Button</Button>
      </Content>
    </>
  )
}

export default App
