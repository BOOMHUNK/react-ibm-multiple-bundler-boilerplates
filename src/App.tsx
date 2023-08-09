import { ComboBox, Content, FilterableMultiSelect, FluidForm } from '@carbon/react';

import './app.scss';
import {
  DarkInvertedSection,
} from './components/molecules';
import { UserProfile } from '@carbon/react/icons';
import { FileUploaderWThumbnail, FilterableDropDown, MegaTabbedMenu } from './components/atoms';

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
  const comboboxItems: DropDownItemType[] = [
    { id: "0", label: 'Red Wines:', isCategory: true },
    { id: "1", label: 'Cabernet Sauvignon' },
    { id: "2", label: 'Merlot' },
    { id: "3", label: 'Malbec' },
    { id: "4", label: 'White Wines', isCategory: true },
    { id: "5", label: 'Chardonnay' },
    { id: "6", label: 'Sauvignon Blanc' },
    { id: "7", label: 'Pinot Grigio' },
  ];
  return (
    <Content>
      <DarkInvertedSection
        Title="You Can Have Non Of These Problems With Fabizi!"
        Desc="In publishing and graphic design, Lorem ipsum is a In
                    publishing and graphic design, Lorem ipsum is In publishing
                    and graphic design, Lorem ipsum is aIn publishing and"
        ButtonTitle="Try it now"
        ButtonAction={() => console.log('Clicked!')}
      />
      <br />

      <MegaTabbedMenu Data={MakeSampleData(15)} sm={1} md={2} lg={6} xl={6} />
      <br />
      <FileUploaderWThumbnail
        labelTitle="Upload file"
        labelDescription="Max file size is 500mb. Supported file types are .jpg and .png."
        buttonLabel="Change"
        buttonKind="primary"
        size="md"
        filenameStatus="edit"
        accept={['.jpg', '.png']}
        iconDescription="Delete file"
        existingFileThumbnailUrlProp="/vite.svg"
        name=""
      />

      <br />

      <FilterableDropDown
        onChange={(d) => {
          console.log(d);
        }}
        // initialSelectedItem={comboboxItems[1]}
        id="wines-filterable-dropdown"
        suffix='optional'
        items={comboboxItems}
        // itemToElement={(item: any) => {
        //   return (

        //   );
        // }}
        downshiftProps={{
          onStateChange: () => {
            // console.log('the state has changed');
          },
        }}

        titleText="Wines"
        helperText="Combobox helper text"
      // warn={true}
      // warnText="adawd"

      />


      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Content>
  );
};

export default App;
