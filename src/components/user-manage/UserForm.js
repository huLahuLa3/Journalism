import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Select, Input } from 'antd'
const { Option } = Select;

const UserForm = forwardRef((props, ref) => {
    const [isDisabled, setisDisabled] = useState(false)
    useEffect(() => {
        setisDisabled(props.isupdateDisabled)
    }, [props.isupdateDisabled])

    const {roleId, region} = JSON.parse(window.sessionStorage.getItem('token'))
    const roleObj = {
      '1': 'superadmin',
      '2': 'admin',
      '3': 'editor'
    }
    const checkRegionDisabled = (item) => {
      if (props.isUpdate) {
        if (roleObj[roleId] === 'superadmin') {
          return false
        } else {
          return true
        }
      } else {
        if (roleObj[roleId] === 'superadmin') {
          return false
        } else {
          return roleObj[item.id] !== 'editor'
        }
      }
    }
    const checkRoleDisabled = (item) => {
      if (props.isUpdate) {
        if (roleObj[roleId] === 'superadmin') {
          return false
        } else {
          return true
        }
      } else {
        if (roleObj[roleId] === 'superadmin') {
          return false
        } else {
          return item.value !== region
        }
      }
    }
  return (
    <Form
    layout="vertical"
    ref={ref}
  >
    <Form.Item
      name="username"
      label="用户名"
      rules={[
        {
          required: true,
          message: "请输入用户名",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="password"
      label="密码"
      rules={[
        {
          required: true,
          message: "请输入密码",
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name="region"
      label="区域"
      rules={isDisabled ? [] : [
        {
          required: true,
          message: "请输入用户名",
        },
      ]}
    >
      <Select disabled={isDisabled}>
        {
          props.regionList.map(item => {
            return (
              <Option value={item.value} key={item.id} disabled={checkRegionDisabled(item)}>{item.title}</Option>
            )
          })
        }
      </Select>
    </Form.Item>
    <Form.Item
      name="roleId"
      label="角色"
      rules={[
        {
          required: true,
          message: "请输入用户名",
        },
      ]}
    >
      <Select onChange={(value) => {
        //   console.log(value);
        if (value === 1) {
            setisDisabled(true)
            ref.current.setFieldsValue({
                region: ''
            })
        } else {
            setisDisabled(false)
        }
      }}>
        {
          props.roleList.map(item => {
            return (
              <Option value={item.id} key={item.id} disabled={checkRoleDisabled(item)}>{item.roleName}</Option>
            )
          })
        }
      </Select>
    </Form.Item>
  </Form>
  )
})

export default UserForm