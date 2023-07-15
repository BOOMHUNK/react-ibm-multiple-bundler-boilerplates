import React, { useState } from 'react'
import { Button, Content, Stack } from '@carbon/react'
import MyHeader from '../components/TutorialHeader/MyHeader'
import { generateData } from '../utils/generateData'
import { ExpressiveCard, Datagrid, useDatagrid } from '@carbon/ibm-products'
// import { CTA } from '@carbon/ibmdotcom-react'

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
        {/* <CTA
          style="feature"
          type="local"
          heading="Lorem Ipsum"
          image={{
            defaultSrc:
              'https://fpoimg.com/672x672?text=1:1&bg_color=ee5396&text_color=161616',
            alt: 'Image alt text'
          }}
          cta={{
            href: 'https://www.example.com'
          }}
        /> */}
        <Datagrid datagridState={{ ...datagridState }} />
        <ExpressiveCard>
          <Stack gap={6}>
            <span>Content belongs here.</span>
            <span className="helper-text">This font is the helper font</span>
          </Stack>
          <Button>Card Button</Button>
        </ExpressiveCard>
      </Content>
    </>
  )
}

export default App
