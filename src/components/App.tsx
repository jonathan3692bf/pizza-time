import React from 'react';
import OrderForm from './order-form'
import './App.css';
import { Layout, Menu, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {console.log(broken);}}
      onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
    >
      <div className="logo">
        Pizza Time
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Icon type="pie-chart" />
          <span className="nav-text">New order</span>
        </Menu.Item>
        <Menu.Item key="2">
          <Icon type="search" />
          <span className="nav-text">Browse orders</span>
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }} />
      <Content style={{ margin: '24px 16px 0' }}>
        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <OrderForm />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Pizza Time ©2020</Footer>
    </Layout>
  </Layout>
  );
}

export default App;
