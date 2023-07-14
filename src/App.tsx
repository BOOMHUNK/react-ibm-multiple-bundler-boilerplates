import React, { useState } from 'react'
import { Button, Content, Stack } from '@carbon/react'
import MyHeader from './components/TutorialHeader/MyHeader'
import { ExpressiveCard, Datagrid, useDatagrid } from '@carbon/ibm-products'
import { Card } from 'carbon-for-ibm-cloud'
import './app.scss'

const App = (): JSX.Element => {
  const defaultHeader: any[] = [
    // {
    //   Header: 'Row Index',
    //   accessor: (row, i) => i,
    //   sticky: 'left',
    //   id: 'rowIndex' // id is required when accessor is a function.
    // },
    // {
    //   Header: 'Pet type',
    //   accessor: 'petType'
    // },
    // {
    //   Header: 'First Name',
    //   accessor: 'firstName',
    //   sticky: 'left'
    // },
    // {
    //   Header: 'Last Name',
    //   accessor: 'lastName'
    // },
    // {
    //   Header: 'Age',
    //   accessor: 'age',
    //   width: 50
    // },
    // {
    //   Header: 'Vet Visits',
    //   accessor: 'visits',
    //   width: 60
    // },
    // {
    //   Header: 'Health',
    //   accessor: 'health',
    //   // eslint-disable-next-line react/prop-types
    //   Cell: ({ cell: { value } }) => (
    //     <span className="custom-cell-wrapper">{value}</span>
    //   )
    // }
  ]

  const columns = React.useMemo(() => [...defaultHeader], []) // These are the columns that will be used by the datagrid
  const [data] = useState([]) // This is the data that will be rendered by the datagrid

  const datagridState = useDatagrid({
    columns,
    data,
    emptyStateTitle: 'Empty state title',
    emptyStateDescription: 'Description explaining why table is empty',
    emptyStateSize: 'lg' // See empty state size options from the EmptyState component
    // multiLineWrap: true,
  })

  return (
    <>
      <MyHeader />
      <Content>
        <Card>Example Card from carbon-for-ibm-cloud module</Card>
        <Datagrid datagridState={{ ...datagridState }} />
        <ExpressiveCard >
          <Stack gap={6}>
            <span>The Stack is from @carbon-react module</span>
            <span className="helper-text">
              The ExpressiveCard and Datagrid below are from
              @carbon/ibm-products module
            </span>
          </Stack>
          <Button>Card Button</Button>
        </ExpressiveCard>
      </Content>
    </>
  )
}

export default App
