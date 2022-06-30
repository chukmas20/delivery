import { Button, Card, Form, Input, InputNumber } from 'antd'
import React from 'react'

const {TextArea} = Input

const CreateMenuItem = () => {
  return (
     <Card title={"New Menu Item"} style={{margin:20}}>
         <Form layout='vertical' wrapperCol={{span: 8}}>
             <Form.Item label="Dish Name" required>
                <Input  placeholder='Enter dish name' />
             </Form.Item>
             <Form.Item label="Dish Description" required>
                <TextArea rows={4}  placeholder='Enter dish description' />
             </Form.Item>
             <Form.Item label="Price (₦)" required>
                <InputNumber />
             </Form.Item>
             <Form.Item  required>
                 <Button type='primary'>Submit</Button>
             </Form.Item>
         </Form>
     </Card>
  )
}

export default CreateMenuItem