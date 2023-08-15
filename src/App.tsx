import { ComboBox, Content, ExpandableTile, TileAboveTheFoldContent, TileBelowTheFoldContent } from '@carbon/react';

import './app.scss';
import {
  DarkInvertedSection,
} from './components/molecules';
import { UserProfile } from '@carbon/react/icons';
import { FileUploaderWThumbnail, FilterableDropDown, MegaTileMenu } from './components/atoms';
import Swiper from './components/molecules/Swiper/Swiper';

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
    const sampleData: MegaTileMenuDataType = [];
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

      <MegaTileMenu Data={MakeSampleData(15)} sm={1} md={2} lg={6} xl={6} />
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
        warn={true}
        warnText="adawd"
      />


      <br />
      <br />
      <br />
      <Swiper heading='Bundles' desc='In publishing and graphic design, Lorem ipsum is a In publishing and graphic design, Lorem ipsum is a publishing and graphic design' tiles={[{
        colSpans: { sm: 4, md: 5, lg: 10 }, element: (<DarkInvertedSection
          Title="First Component Title"
          Desc="This is a component in the swiper while spanning columns with settings: sm: 4, md: 5, lg: 10"
          ButtonTitle="Try it"
          ButtonAction={() => console.log('Clicked!')}
        />)
      },
      {
        colSpans: { sm: 4, md: 3, lg: 6 }, element: (<DarkInvertedSection
          Title="Second Component"
          Desc="A component in the swiper spanning with settings: sm: 4, md: 3, lg: 6"
          ButtonTitle="Try"
          ButtonAction={() => console.log('Clicked!')}
        />)
      },
      {
        colSpans: { sm: 4, md: 8, lg: 16 }, element: (<DarkInvertedSection
          Title="You Can use Carbon Grid Column sizing in this Swiper!"
          Desc="This is a completely individual component in the swiper while spanning columns with settings: sm: 4, md: 8, lg: 16"
          ButtonTitle="Try it now"
          ButtonAction={() => console.log('Clicked!')}
        />)
      }]} />
      <br />


      <br />
      <br />
      <br />
      <br />
    </Content>
  );
};

export default App;
