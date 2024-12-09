<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png"/>
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-tabs size="large" :tabBarStyle="{textAlign: 'center'}" style="padding: 0 2px;">
          <a-tab-pane tab="学生登录" key="1">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
                type="userName"
                v-decorator="['userName', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="888888"
                autocomplete="autocomplete"
                type="password"
                v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
          <a-tab-pane tab="教师登录" key="2">
            <a-alert type="error" :closable="true" v-show="error" :message="error" showIcon style="margin-bottom: 24px;" />
            <a-form-item>
              <a-input
                autocomplete="autocomplete"
                size="large"
                placeholder="admin"
                type="userName"
                v-decorator="['userName', {rules: [{ required: true, message: '请输入账户名', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-input
                size="large"
                placeholder="888888"
                autocomplete="autocomplete"
                type="password"
                v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-tab-pane>
        </a-tabs>
        <div>
          <a-checkbox :checked="true">自动登录</a-checkbox>
          <a style="float: right">忘记密码</a>
        </div>
        <a-form-item>
          <a-button :loading="logging" style="width: 100%;margin-top: 24px" size="large" htmlType="submit"
                    type="primary">登录
          </a-button>
        </a-form-item>
        <div>
          <router-link style="float: right" to="/dashboard/workplace">注册账户</router-link>
        </div>
      </a-form>
    </div>
  </common-layout>
</template>

<script>
import CommonLayout from '@/layouts/CommonLayout'
import {login} from '@/services/user' // 导入login和getRoutesConfig
import {setAuthorization} from '@/utils/request'
import {loadRoutes} from '@/utils/routerUtil'
import {mapMutations} from 'vuex'

import Mock from 'mockjs';
// Mock 数据（模拟的用户信息）
const user = Mock.mock({
  name: '@ADMIN',
  avatar: '@AVATAR',
  address: '@CITY',
  position: '@POSITION'
});
const mockRoutesConfig = [{
  router: 'root',
  children: [
    {
      router: 'dashboard',
      children: ['workplace', 'analysis'],
    },
    {
      router: 'form',
      children: ['basicForm', 'stepForm', 'advanceForm']
    },
    {
      router: 'basicForm',
      name: '验权表单',
      icon: 'file-excel',
      authority: 'queryForm'
    },
    {
      router: 'antdv',
      path: 'antdv',
      name: 'Ant Design Vue',
      icon: 'ant-design',
      link: 'https://www.antdv.com/docs/vue/introduce-cn/'
    },
    {
      router: 'document',
      path: 'document',
      name: '使用文档',
      icon: 'file-word',
      link: 'https://iczer.gitee.io/vue-antd-admin-docs/'
    }
  ]
}];

export default {
  name: 'Login',
  components: {CommonLayout},
  data() {
    return {
      logging: false,
      error: '',
      form: this.$form.createForm(this)
    }
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName
    }
  },
  methods: {
    ...mapMutations('account', ['setUser', 'setPermissions', 'setRoles']),
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const userName = this.form.getFieldValue('userName')
          const password = this.form.getFieldValue('password')
          login(userName, password).then(this.afterLogin)
        }
      })
    },
    async afterLogin(res) {
      this.logging = false;

      // 获取登录返回结果
      const loginRes = res.data;
      console.log(loginRes.code);

      if (loginRes.code === 200) {
        // 从后端返回的数据中提取 token 和其他信息
        const { tokenHead, token } = loginRes.data;

        // 如果后端没有提供完整的用户信息，使用 Mock 数据填充
        const userData = loginRes.data.user || user; // 如果后端没有提供 user，则使用 Mock 的数据
        // （模拟数据或从后端获取）
        const permissions = loginRes.data.permissions || [{ id: 'queryForm', operation: ['add', 'edit'] }];
        const roles = loginRes.data.roles || [{ id: 'admin', operation: ['add', 'edit', 'delete'] }];
        const expireAt = new Date(new Date().getTime() + 30 * 60 * 1000)

        // 设置用户信息、权限、角色
        this.setUser(userData);
        this.setPermissions(permissions);
        this.setRoles(roles);

        setAuthorization({ token: `${tokenHead} ${token}`, expireAt });

        console.log("getRoutesConfig")
        // 获取路由配置
        const routesConfig = mockRoutesConfig
        loadRoutes(routesConfig)
        this.$router.push('/dashboard/workplace')
        this.$message.success(loginRes.message, 3)

      } else {
        // 如果后端返回错误，显示错误信息
        this.error = loginRes.message || '账户名或密码错误';
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .common-layout{
    .top {
      text-align: center;
      .header {
        height: 44px;
        line-height: 44px;
        a {
          text-decoration: none;
        }
        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
        }
        .title {
          font-size: 33px;
          color: @title-color;
          font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;
        }
      }
      .desc {
        font-size: 14px;
        color: @text-color-second;
        margin-top: 12px;
        margin-bottom: 40px;
      }
    }
    .login{
      width: 368px;
      margin: 0 auto;
      @media screen and (max-width: 576px) {
        width: 95%;
      }
      @media screen and (max-width: 320px) {
        .captcha-button{
          font-size: 14px;
        }
      }
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
    }
  }
</style>