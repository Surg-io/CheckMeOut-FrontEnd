import { Form, Select, Input } from "antd";

export const Report = () => {
  return (
    <Form>
      <Form.Item>
        <Select>
          Type
        </Select>
      </Form.Item>
      <Form.Item>
        <Select>
          Device Name
        </Select>
      </Form.Item>
      <Form.Item>
        <Input/>
      </Form.Item>
    </Form>
  );
}