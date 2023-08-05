import { Content, Heading, Grid, Column, Button, Stack } from '@carbon/react';

import { ArrowRight } from '@carbon/react/icons';

import './app.scss';
import { DarkInvertedSection, MegaTabbedMenu } from './components/molecules';
import { UserProfile } from '@carbon/react/icons';

const App = (): JSX.Element => {
  const MakeSampleData = (count: number) => {
    const singleSampleTabData: RawData = {
      Icon: UserProfile,
      Title: 'Customer',
      Desc: 'In publishing and graphic design, Lorem ipsum is a placeholder text ',
      ContentTitle: 'The Features:',
      ContentSections: [
        {
          SectionTitle: 'Payroll',
          SectionPoints: [
            'In publishing and graphic design,Lorem',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and graphic',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and',
          ],
        },
        {
          SectionTitle: 'Payroll',
          SectionPoints: [
            'In publishing and graphic design,Lorem',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and graphic',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and',
          ],
        },
        {
          SectionTitle: 'Payroll',
          SectionPoints: [
            'In publishing and graphic design,Lorem',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and graphic',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and',
          ],
        },
        {
          SectionTitle: 'Payroll',
          SectionPoints: [
            'In publishing and graphic design,Lorem',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and graphic',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and',
          ],
        },
        {
          SectionTitle: 'Payroll',
          SectionPoints: [
            'In publishing and graphic design,Lorem',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and graphic',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and',
          ],
        },
        {
          SectionTitle: 'Payroll',
          SectionPoints: [
            'In publishing and graphic design,Lorem',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and graphic',
            'ipsum is a placeholder In publishing and',
            'placeholder In publishing and',
          ],
        },
      ],
      ButtonTitle: 'Buy It',
    };
    const sampleData: MegaTabbedMenuDataType = [];
    for (let i = 0; i < count; i++) sampleData.push(singleSampleTabData);
    sampleData.push({
      IsButton: true,
      ButtonTitle: 'Watch pricing',
    });
    return sampleData;
  };
  return (
    <Content>
      <DarkInvertedSection
        Title="You Can Have Non Of These Problems With Fabizi!"
        Desc="In publishing and graphic design, Lorem ipsum is a In
                    publishing and graphic design, Lorem ipsum is In publishing
                    and graphic design, Lorem ipsum is aIn publishing and"
        ButtonTitle="Try it now"
        ButtonAction={(e) => console.log('Clicked!')}
      />
      <br />
      <br />
      <br />

      <MegaTabbedMenu Data={MakeSampleData(15)} sm={1} md={2} lg={6} xl={6} />
    </Content>
  );
};

export default App;
