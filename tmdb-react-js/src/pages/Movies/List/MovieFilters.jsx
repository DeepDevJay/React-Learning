import {
    Button, DatePicker, Divider, Drawer, Form, InputNumber, Select, Space
} from "antd";

import useGenres from "../../../hooks/useGenres";
import useLanguages from "../../../hooks/useLanguages";
import useCountries from "../../../hooks/useCountries";

const { RangePicker } = DatePicker;

export default function MovieFilters({ open, onClose, filters, setFilters }) {
  const { data:genreData } = useGenres();
  const { data:languageData } = useLanguages();
  const { data:countryData } = useCountries();

  const [form] = Form.useForm();

  const applyFilters=(values)=>{
    setFilters({
      genreIds:values.genreIds,
      languageIds:values.languageIds,
      countryIds:values.countryIds,
      voteAverageMin:values.voteAverageMin,
      voteAverageMax:values.voteAverageMax,
      popularityMin:values.popularityMin,
      popularityMax:values.popularityMax,
      runtimeMin:values.runtimeMin,
      runtimeMax:values.runtimeMax,
      releaseDateFrom:values.releaseDate?.[0]?.format("YYYY-MM-DD"),
      releaseDateTo:values.releaseDate?.[1]?.format("YYYY-MM-DD"),
    });
    onClose();
  };

  return(
    <Drawer
      width={420}
      open={open}
      title="Movie Filters"
      onClose={onClose}
    >
      <Form layout="vertical" form={form} onFinish={applyFilters}>
        <Form.Item label="Genres" name="genreIds">
          <Select
            mode="multiple"
            options={
              genreData?.listGenre?.map(
                genre=>({
                  label:genre.name,
                  value:genre.id,
                })
              )
            }
          />
        </Form.Item>
        <Form.Item label="Languages" name="languageIds">
          <Select
            mode="multiple"
            options={
              languageData?.languages?.data?.map(
                language=>({
                  label:language.englishName,
                  value:language.id,
                })
              )
            }
          />
        </Form.Item>
        <Form.Item label="Countries" name="countryIds">
          <Select
            mode="multiple"
            options={
              countryData?.countries?.data?.map(
                country=>({
                  label:country.englishName,
                  value:country.id,
                })
              )
            }
          />
        </Form.Item>
          
        <Divider/>

        <Space>
          <Form.Item label="Rating Min" name="voteAverageMin">
            <InputNumber/>
          </Form.Item>
          <Form.Item label="Rating Max" name="voteAverageMax">
            <InputNumber/>
          </Form.Item>
        </Space>
        <Space>
          <Form.Item label="Popularity Min" name="popularityMin">
            <InputNumber/>
          </Form.Item>
          <Form.Item label="Popularity Max" name="popularityMax">
            <InputNumber/>
          </Form.Item>
        </Space>
        <Space>
          <Form.Item label="Runtime Min" name="runtimeMin">
            <InputNumber/>
          </Form.Item>
          <Form.Item label="Runtime Max" name="runtimeMax">
            <InputNumber/>
          </Form.Item>
        </Space>

        <Form.Item label="Release Date" name="releaseDate" >
          <RangePicker style={{ width:"100%" }} />
        </Form.Item>

        <Button type="primary" htmlType="submit" block >
          Apply Filters
        </Button>
      </Form>
    </Drawer>
  );
}
