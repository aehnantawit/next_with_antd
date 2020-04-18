import React, { Component } from 'react';
import fetch from 'node-fetch';
import { Layout, Menu, Button, Tooltip, Avatar, Card, Typography, Input, Row, Col, Radio, Breadcrumb, Table, Modal, Form, message } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    UserAddOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    HomeOutlined,
    ReloadOutlined,
    SyncOutlined,
    CheckCircleOutlined,
    StopOutlined,
    LockOutlined

} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
const { Column } = Table;

Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
}

const UTC2DATE = props => {

    const d = new Date(props.utc);
    const dformat = [(d.getMonth() + 1).padLeft(),
    d.getDate().padLeft(),
    d.getFullYear()].join('/') + ' ' +
        [d.getHours().padLeft(),
        d.getMinutes().padLeft()].join(':');

    return <span>{`${dformat}`}</span>
}

// const columns = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//         key: 'name',
//         width: '50%',
//         render: text => <a>{text}</a>,
//     },
//     {
//         title: 'Active',
//         dataIndex: 'active',
//         key: 'active',
//         width: '20%',
//         align: 'center',
//         render: status => (
//             <span>{status === true ? <CheckCircleOutlined style={{ fontSize: '22px', color: 'green' }} /> : <StopOutlined style={{ fontSize: '22px', color: 'red' }} />}</span>
//         )
//     },
//     {
//         title: 'Created',
//         dataIndex: 'created',
//         key: 'created',
//         width: '30%',
//         align: 'center'
//     },
// ];

const data = [
    {
        key: '1',
        Username: 'John Brown',
        isBlock: true,
        createdAt: '05-04-2020 11:38'
    },
    {
        key: '2',
        Username: 'สมชาย ใจดี',
        isBlock: false,
        createdAt: '01-04-2020 16:10'
    },
    {
        key: '3',
        Username: 'admin ทดสอบ',
        isBlock: false,
        createdAt: '01-04-2020 08:26'
    }
];

class Index extends Component {
    state = {
        collapsed: false,
        modalShow: false,
        modalEditShow: false,
        list_member: []
    };

    componentDidMount() {
        this.setState({ list_member: data });
        // this.getMember();
    }

    async getMember() {
        const res = await fetch('http://localhost:1337/members')
        const list_member = await res.json()
        // console.log(list_member);
        this.setState({ list_member: list_member });
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    refresh = () => {
        this.getMember();
    }

    modalToggle = () => {
        this.setState({ modalShow: !this.state.modalShow });
    }

    modalEditToggle = () => {
        this.setState({ modalEditShow: !this.state.modalEditShow });
    }

    onFinish = values => {
        // console.log('Success:', values);
        message.success('Submit data success');
        this.setState({ modalShow: false });
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    onEditFinish = values => {
        // console.log('Success:', values);
        message.success('Edit data success');
        this.setState({ modalEditShow: false });
    };

    onEditFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <Layout style={{ height: "100vh" }}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <UserOutlined />
                            <span>Members</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <VideoCameraOutlined />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <UploadOutlined />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {this.state.collapsed ? (
                            <MenuUnfoldOutlined className='trigger' onClick={this.toggle} />
                        ) : (
                                <MenuFoldOutlined className='trigger' onClick={this.toggle} />
                            )}

                        <Avatar size={48} icon={<UserOutlined />} style={{ float: 'right', margin: '8px 16px' }} />
                    </Header>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        <Breadcrumb>
                            <Breadcrumb.Item href="">
                                <HomeOutlined />
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                <UserOutlined />
                                <span>Members</span>
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Card size="small" style={{ width: '100%', marginTop: '10px' }}>
                            <Row gutter={16}>
                                <Col span={12}><Search size="large" placeholder="input search text" onSearch={value => console.log(value)} enterButton /></Col>
                                <Col span={6}>
                                    <Tooltip title="Member Type">
                                        <Radio.Group size="large" value={'-1'}>
                                            <Radio.Button value="-1">ALL</Radio.Button>
                                            <Radio.Button value="0">Active</Radio.Button>
                                            <Radio.Button value="1">Block</Radio.Button>
                                        </Radio.Group>
                                    </Tooltip>
                                </Col>
                                <Col span={6} style={{ textAlign: 'right' }}>
                                    <Tooltip title="New member">
                                        <Button size="large" type="primary" shape="circle" icon={<UserAddOutlined />} onClick={this.modalToggle} />
                                    </Tooltip>
                                </Col>
                            </Row>
                        </Card>
                        <Card size="small" title="Members" extra={<Tooltip title="Reload"><a href="#" onClick={this.refresh}><SyncOutlined style={{ fontSize: '22px' }} /></a></Tooltip>} style={{ width: '100%', marginTop: '10px' }}>
                            <Table size="middle" bordered dataSource={this.state.list_member}>
                                <Column title="Name" dataIndex="Username" key="Username" width="50%"
                                    render={name => (<a href="#" onClick={this.modalEditToggle}>{name}</a>)}
                                />
                                <Column title="Status" dataIndex="isBlock" key="isBlock" width="20%" align="center"
                                    render={status => (
                                        <span>{status === false ? <CheckCircleOutlined style={{ fontSize: '22px', color: 'green' }} /> : <StopOutlined style={{ fontSize: '22px', color: 'red' }} />}</span>
                                    )} />
                                <Column title="Created" dataIndex="createdAt" key="createdAt" width="30%" align="center"
                                    render={utc => <UTC2DATE utc={utc} />} />
                            </Table>
                        </Card>
                    </Content>
                    {/* ADD NEW */}
                    <Modal
                        title="New Member"
                        maskClosable={false}
                        visible={this.state.modalShow}
                        footer={null}
                        onCancel={this.modalToggle}
                    >
                        <Form
                            name="frm_member"
                            onFinish={this.onFinish}
                            onFinishFailed={this.onFinishFailed}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Username required 4-20 characters',
                                        min: 4,
                                        max: 20
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Password required 4-20 characters',
                                        min: 4,
                                        max: 20
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password size="large" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                            </Form.Item>
                            <Form.Item style={{ paddingTop: '10px' }}>
                                <Button size="large" type="primary" htmlType="submit" block>
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                    {/* EDIT */}
                    <Modal
                        title="Edit Member"
                        maskClosable={false}
                        visible={this.state.modalEditShow}
                        footer={null}
                        onCancel={this.modalEditToggle}
                    >
                        <Form
                            name="frm_member"
                            onFinish={this.onEditFinish}
                            onFinishFailed={this.onEditFinishFailed}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Username required 4-20 characters',
                                        min: 4,
                                        max: 20
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input size="large" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                            </Form.Item>
                            <Form.Item style={{ paddingTop: '10px' }}>
                                <Button size="large" type="primary" htmlType="submit" block>
                                    SAVE CHANGE
                                </Button>
                                <div style={{ textAlign: 'center', margin: '10px 0' }}><Text strong>OR</Text></div>
                                <Button size="large" type="danger" htmlType="button" onClick={this.modalEditToggle} icon={<StopOutlined />} block>
                                    BLOCK
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </Layout>
            </Layout>
        )
    }

}

export default Index;