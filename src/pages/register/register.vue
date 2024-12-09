<template>
  <common-layout>
    <div class="top">
      <div class="header">
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="title">{{ systemName }}</span>
      </div>
      <div class="desc">Ant Design 是西湖区最具影响力的 Web 设计规范</div>
    </div>
    <div class="login">
      <a-form @submit="onSubmit" :form="form">
        <a-row :gutter="32"> <!-- 使用 :gutter="32" 绑定 -->
          <a-col :span="12">
            <a-form-item>
              <a-input
                v-model="formData.username"
                size="large"
                placeholder="请输入用户名"
                :rules="[{ required: true, message: '请输入用户名' }]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item>
              <a-input
                v-model="formData.name"
                size="large"
                placeholder="请输入姓名"
                :rules="[{ required: true, message: '请输入姓名' }]"
              >
                <a-icon slot="prefix" type="user" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="32">
          <a-col :span="12">
            <a-form-item>
              <a-input
                v-model="formData.password"
                size="large"
                placeholder="请输入密码"
                type="password"
                :rules="[{ required: true, message: '请输入密码' }]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item>
              <a-input
                v-model="formData.repeat_password"
                size="large"
                placeholder="请确认密码"
                type="password"
                :rules="[{ required: true, message: '请确认密码' }]"
              >
                <a-icon slot="prefix" type="lock" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="32">
          <a-col :span="12">
            <a-form-item>
              <a-input
                v-model="formData.phone_number"
                size="large"
                placeholder="请输入电话号码"
                :rules="[{ required: true, message: '请输入电话号码' }]"
              >
                <a-icon slot="prefix" type="phone" />
              </a-input>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item>
              <a-input
                v-model="formData.email"
                size="large"
                placeholder="请输入电子邮件"
                :rules="[{ required: true, message: '请输入电子邮件' }]"
              >
                <a-icon slot="prefix" type="mail" />
              </a-input>
            </a-form-item>
          </a-col>
        </a-row>

        <a-row :gutter="32">
          <a-col :span="12">
            <a-form-item>
              <a-select
                v-model="formData.identity"
                size="large"
                placeholder="请选择身份"
                :rules="[{ required: true, message: '请选择身份' }]"
              >
                <a-select-option value="student">学生</a-select-option>
                <a-select-option value="teacher">教师</a-select-option>
                <a-select-option value="admin">管理员</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>

        <a-form-item>
          <a-button :loading="logging" style="width: 100%; margin-top: 32px" size="large" type="primary" @click="onSubmit">
            注册
          </a-button>
        </a-form-item>

        <div>
          <a-button style="float: right; margin-top: 10px;" size="middle" type="default" @click="goToLogin">已有账号？返回登录</a-button>
        </div>
      </a-form>
    </div>
  </common-layout>
</template>





<script>
import CommonLayout from "@/layouts/CommonLayout";
import { register } from "@/services/user"; // 假设有一个注册 API

export default {
  name: "Register",
  components: { CommonLayout },
  data() {
    return {
      logging: false,
      formData: {
        username: "",
        password: "",
        repeat_password: "",
        name: "",
        phone_number: "",
        email: "",
        identity: "student"
      },
      error: ""
    };
  },
  computed: {
    systemName() {
      return this.$store.state.setting.systemName;
    }
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();

      if (this.formData.password !== this.formData.repeat_password) {
        this.error = "密码不一致";
        return;
      }

      if (this.error) {
        this.error = ""; // 清除之前的错误信息
      }

      try {
        this.logging = true;
        const response = await register(this.formData);
        if (response.code === 200) {
          this.$message.success("注册成功！");
          this.$router.push({
            path: "/login",
            query: {
              username: this.formData.username,
              password: this.formData.password
            }
          });
        } else {
          this.$message.error("注册失败：" + response.message);
        }
      } catch (error) {
        this.$message.error("注册失败，请重试！");
      } finally {
        this.logging = false;
      }
    },
    goToLogin() {
      this.$router.push("/login");
    }
  }
};
</script>

<style lang="less" scoped>
.common-layout {
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
        font-weight: 600;
      }
    }
    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 40px;
    }
  }
  .login {
    width: 368px;
    margin: 0 auto;
    @media screen and (max-width: 576px) {
      width: 95%;
    }
    @media screen and (max-width: 320px) {
      .captcha-button {
        font-size: 14px;
      }
    }
  }
}
</style>
