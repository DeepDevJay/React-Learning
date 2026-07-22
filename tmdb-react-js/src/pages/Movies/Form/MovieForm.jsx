import { useEffect } from "react";
import {
  Button, Card, Col, DatePicker, Divider, Form,
  Input, InputNumber, Row, Select, Space, Switch,
} from "antd";
import dayjs from "dayjs";

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import { cleanMoviePayload } from "../../../utils/moviePayload";

const { TextArea } = Input;

const MOVIE_STATUS_OPTIONS = [
  { label: "Rumored", value: "Rumored" },
  { label: "Planned", value: "Planned" },
  { label: "In Production", value: "In Production" },
  { label: "Post Production", value: "Post Production" },
  { label: "Released", value: "Released" },
  { label: "Canceled", value: "Canceled" },
];

export default function MovieForm({ mode = "create", initialValues, onSubmit, loading = false }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (!initialValues) {
      form.resetFields();
      return;
    }

    form.setFieldsValue({
      ...initialValues,
      releaseDate: initialValues.releaseDate ? dayjs(initialValues.releaseDate) : null,
      adult: initialValues.adult ?? false,
      video: initialValues.video ?? false,
    });
  }, [initialValues, form]);

  const handleFinish = (values) => {
    const payload = cleanMoviePayload({
      ...values,
      releaseDate: values.releaseDate
        ? values.releaseDate.format("YYYY-MM-DD")
        : null,
    });

    onSubmit(payload);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{ adult: false, video: false }}
    >
      <Card title="Basic Information">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Please enter movie title",
                },
              ]}
            >
              <Input placeholder="Enter movie title" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Original Title"
              name="originalTitle"
              rules={[
                {
                  required: true,
                  message: "Please enter original title",
                },
              ]}
            >
              <Input placeholder="Enter original title" />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Overview"
              name="overview"
              rules={[
                {
                  required: true,
                  message: "Please enter movie overview",
                },
              ]}
            >
              <TextArea rows={5} placeholder="Enter movie overview" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Tagline" name="tagline">
              <Input placeholder="Enter tagline" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Original Language"
              name="originalLanguage"
              rules={[
                {
                  required: true,
                  message: "Please enter original language",
                },
              ]}
            >
              <Input placeholder="e.g. en" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Release Date"
              name="releaseDate"
              rules={[
                {
                  required: true,
                  message: "Please select release date",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Status"
              name="status"
              rules={[
                {
                  required: true,
                  message: "Please select status",
                },
              ]}
            >
              <Select placeholder="Select status" options={MOVIE_STATUS_OPTIONS} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Divider />

      <Card title="Movie Details">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Home Page" name="homePage">
              <Input placeholder="https://example.com" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Streaming On" name="streamingOn">
              <Input placeholder="Netflix, Prime Video, etc." />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Image URL" name="imageUrl">
              <Input placeholder="Enter image URL" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Runtime"
              name="runtime"
              rules={[
                {
                  required: true,
                  message: "Please enter runtime",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} placeholder="Minutes" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Divider />

      <Card title="Financial Information">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Budget"
              name="budget"
              rules={[
                {
                  required: true,
                  message: "Please enter budget",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Revenue"
              name="revenue"
              rules={[
                {
                  required: true,
                  message: "Please enter revenue",
                },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Divider />

      <Card title="Ratings">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Form.Item label="Popularity" name="popularity">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Vote Average" name="voteAverage">
              <InputNumber min={0} max={10} step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col xs={24} md={8}>
            <Form.Item label="Vote Count" name="voteCount">
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Divider />

      <Card title="Genres">
        <Form.List name="genres">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row
                  key={key}
                  gutter={16}
                  align="middle"
                  style={{ marginBottom: 16 }}
                >
                  <Col xs={24} md={20}>
                    <Form.Item
                      {...restField}
                      name={[name, "name"]}
                      label="Genre Name"
                    >
                      <Input placeholder="Enter genre name" />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={4}>
                    <Button
                      danger
                      icon={<MinusCircleOutlined />}
                      onClick={() => remove(name)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              ))}

              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Genre
              </Button>
            </>
          )}
        </Form.List>
      </Card>

      <Divider />

      <Card title="Production Companies">
        <Form.List name="companies">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} size="small" style={{ marginBottom: 16 }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "name"]} label="Company Name">
                        <Input placeholder="Company name" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "description"]} label="Description">
                        <Input placeholder="Description" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "headquarters"]} label="Headquarters">
                        <Input placeholder="Headquarters" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "homepage"]} label="Homepage">
                        <Input placeholder="Homepage URL" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "logoPath"]} label="Logo Path">
                        <Input placeholder="Logo path" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "originCountry"]} label="Origin Country">
                        <Input placeholder="Origin country" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "parentCompany"]} label="Parent Company">
                        <Input placeholder="Parent company" />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Button danger icon={<MinusCircleOutlined />} onClick={() => remove(name)}>
                        Remove Company
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Production Company
              </Button>
            </>
          )}
        </Form.List>
      </Card>

      <Divider />

      <Card title="Collections">
        <Form.List name="collections">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} size="small" style={{ marginBottom: 16 }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "tmdbId"]} label="TMDB ID">
                        <InputNumber style={{ width: "100%" }} min={0} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "name"]} label="Collection Name">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item {...restField} name={[name, "overview"]} label="Overview">
                        <TextArea rows={3} />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Divider orientation="left">
                        Poster Image
                      </Divider>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "posterData", "filePath" ]} label="File Path">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "posterData", "languageCode"]} label="Language Code">
                        <Input placeholder="en" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[ name, "posterData", "aspectRatio"]} label="Aspect Ratio">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[ name, "posterData", "width"]} label="Width">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[ name, "posterData", "height" ]} label="Height">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Divider orientation="left">
                        Backdrop Image
                      </Divider>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "backdropData", "filePath" ]} label="File Path">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "backdropData", "languageCode" ]} label="Language Code">
                        <Input placeholder="en" />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[ name, "backdropData", "aspectRatio" ]} label="Aspect Ratio">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[ name, "backdropData", "width" ]} label="Width">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[ name, "backdropData", "height" ]} label="Height">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Button danger icon={<MinusCircleOutlined />} onClick={() => remove(name)}>
                        Remove Collection
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Collection
              </Button>
            </>
          )}
        </Form.List>
      </Card>

      <Divider />

      <Card title="Cast & Crew">
        <Form.List name="credits">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Card key={key} size="small" style={{ marginBottom: 16 }}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[name, "creditType"]} label="Credit Type">
                        <Select
                          options={[
                            { label: "Cast", value: "CAST" },
                            { label: "Crew", value: "CREW" },
                          ]}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[name, "department"]} label="Department">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[name, "job"]} label="Job">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[name, "character"]} label="Character">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={6}>
                      <Form.Item {...restField} name={[name, "characterGender"]} label="Gender">
                        <Select
                          allowClear
                          options={[
                            { label: "Male", value: "MALE" },
                            { label: "Female", value: "FEMALE" },
                            { label: "Other", value: "OTHER" },
                          ]}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={6}>
                      <Form.Item {...restField} name={[ name, "characterAdult" ]} label="Adult Character" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Divider orientation="left">
                        Person
                      </Divider>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "person", "name" ]} label="Person Name">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "person", "tmdbId" ]} label="TMDB ID">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "person", "knownForDepartment" ]} label="Known For Department">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "person", "placeOfBirth" ]} label="Place of Birth">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Form.Item {...restField} name={[ name, "person", "biography" ]} label="Biography">
                        <TextArea rows={4} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "person", "profilePath" ]} label="Profile Path">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                      <Form.Item {...restField} name={[ name, "person", "homePage" ]} label="Homepage">
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[ name, "person", "popularity" ]} label="Popularity">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[ name, "person", "gender" ]} label="Gender ID">
                        <InputNumber style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>

                    <Col xs={24} md={8}>
                      <Form.Item {...restField} name={[ name, "person", "adult" ]} label="Adult" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <Button danger icon={<MinusCircleOutlined />} onClick={() => remove(name)}>
                        Remove Credit
                      </Button>
                    </Col>
                  </Row>
                </Card>
              ))}

              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Cast / Crew
              </Button>
            </>
          )}
        </Form.List>
      </Card>

      <Card title="Options">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Form.Item label="Adult" name="adult" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Video" name="video" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Divider />

      <Space>
        <Button type="primary" htmlType="submit" loading={loading}>
          {
            mode === "create" ? "Create Movie" : "Update Movie"
          }
        </Button>
      </Space>
    </Form>
  );
}
