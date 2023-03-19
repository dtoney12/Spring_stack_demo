import {useState, useEffect} from 'react';
import {getAllStudents, deleteStudent, addNewStudent} from "./client";
import {Avatar, Badge, Breadcrumb, Button, Empty, Layout, Menu, Spin, Table, Tag, Radio, Popconfirm} from 'antd';
import {
    DesktopOutlined, DownloadOutlined,
    FileOutlined, LoadingOutlined,
    PieChartOutlined, PlusOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';

import StudentDrawerForm from "./StudentDrawerForm";
import './App.css';
import {errorNotification, successNotification} from "./Notification";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const TheAvatar = ({name}) => {
    let trim = name.trim();
    if (name.trim().length === 0) {
        return <Avatar icon={<UserOutlined/>}/>
    }
    const split = trim.split(" ");
    if (split.length === 1) {
        return <Avatar>{name.charAt(0)}</Avatar>
    }
    return <Avatar>{`${name.charAt(0)}${name.charAt(name.length-1)}`}</Avatar>
}

const removeStudent = (studentId, callback) => {
    deleteStudent(studentId).then(()=> {
        successNotification("Student deleted", "student was deleted");
        callback();
    }).catch(err => err.response.json().then(res => {
        console.log(res);
        errorNotification(
            "There was an issue",
            `${res.message} [statusCode: ${res.status}]`)
    }))
}

const columns = fetchStudents => [
    {
        title:'',
        dataIndex: 'avatar',
        key: 'avatar',
        render: (text, student) => <TheAvatar name={student.name}/>
    },
    {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title:'',
        dataIndex: 'actions',
        key: 'actions',
        render: (text, student) =>
            <Radio.Group>
                <Radio.Button value="Edit">Edit</Radio.Button>
                <Popconfirm
                    title={`delete ${student.name}`}
                    onConfirm = {()=>removeStudent(student.id, fetchStudents)}>
                    <Radio.Button value="small">Delete</Radio.Button>
                </Popconfirm>
            </Radio.Group>
    }
];

const antIcon = <LoadingOutlined style={{fontSize: 24}} spin/>;

function App() {
    const [students, setStudents] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showDrawer, setShowDrawer] = useState(false);

    const fetchStudents = () =>
        getAllStudents()
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setStudents(data);
                setFetching(false);
            }).catch(err => err.response.json().then(res => {
                console.log(res);
                errorNotification("There was an issue",
                    `${res.message} [statusCode: ${res.status}]`)
        })).finally(()=>setFetching(false));

    useEffect(() => {
        // console.log("component is mounted");
        fetchStudents();
    }, []);

    const renderStudents = () => {
        if (fetching) {
            return <Spin indicator={antIcon}/>
        }
        if (students.length <= 0) {
            return <>
                <StudentDrawerForm
                    showDrawer={showDrawer}
                    setShowDrawer={setShowDrawer}
                    fetchStudents={fetchStudents}
                />
                <Tag style={{marginLeft: "10 px"}}>Number of Students</Tag>
                <Badge
                    className="site-badge"
                    count={students.length}
                    style={{
                        backgroundColor: '#52c41a',
                    }}
                />
                <br/><br/>
                <Button
                    onClick={() => setShowDrawer(!showDrawer)}
                    type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                    Add New Student
                </Button>
                </>
        }
        return <>
            <StudentDrawerForm
                showDrawer={showDrawer}
                setShowDrawer={setShowDrawer}
                fetchStudents={fetchStudents}
            />
            <Table
                dataSource={students}
                columns={columns(fetchStudents)}
                bordered
                title={() =>
                    <>

                        <Tag style={{marginLeft: "10 px"}}>Number of Students</Tag>
                        <Badge
                            className="site-badge"
                            count={students.length}
                            style={{
                                backgroundColor: '#52c41a',
                            }}
                        />
                        <br/><br/>
                        <Button
                            onClick={() => setShowDrawer(!showDrawer)}
                            type="primary" shape="round" icon={<PlusOutlined/>} size="small">
                            Add New Student
                        </Button>
                    </>
                }
                pagination={{pageSize: 50}}
                scroll={{y: 500}}
                rowKey={(dude) => dude.id}
            />;
        </>
    }

    return <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed}
               onCollapse={setCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined/>}>
                    Option 1
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined/>}>
                    Option 2
                </Menu.Item>
                <SubMenu key="sub1" icon={<UserOutlined/>} title="User">
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<TeamOutlined/>} title="Team">
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                </SubMenu>
                <Menu.Item key="9" icon={<FileOutlined/>}>
                    Files
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}/>
            <Content style={{margin: '0 16px'}}>
                <Breadcrumb style={{margin: '16px 0'}}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Dale</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                    {renderStudents()}
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>By Dale Toney</Footer>
        </Layout>
    </Layout>
}

export default App;