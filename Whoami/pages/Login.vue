<script setup>
// import { NuxtLink } from ".nuxt/components";
import { on } from "events";
import { useCounterStore } from "~/stores/appStore";

const email = ref("");
const password = ref("");
const store = useCounterStore();
function Login() {
  const { isFetching, data, error } = store.Login(email.value, password.value);
  if (!error && localStorage.getItem("token")) {
    //  redirect to error page
    navigateTo("/");
  } else {
    //  redirect to login page
    navigateTo("/login");
  }
}
</script>
<template>
  <div>
    <div class="flex items-center justify-center h-[100vh] w-[100vw]">
      <div
        class="border-solid border-4 border-[#00a884] p-4 rounded-md shadow-md"
      >
        <h1 class="text-center mb-[16px] font-semibold">Login</h1>
        <div>
          <ul>
            <li class="mb-[16px]">
              <label for="email" class="inline-block w-[70px]">Email</label>
              <input
                class="rounded-sm p-[4px] focus:outline-none"
                type="email"
                id="email"
                v-model="email"
              />
            </li>
            <li class="mb-[16px]">
              <label for="password" class="inline-block w-[70px]"
                >Password</label
              >
              <input
                class="rounded-sm p-[4px] focus:outline-none"
                type="password"
                id="password"
                v-model="password"
              />
            </li>
            <li class="flex w-full justify-center">
              <button
                @click="Login"
                class="bg-[#00a884] text-white rounded-md p-2"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
