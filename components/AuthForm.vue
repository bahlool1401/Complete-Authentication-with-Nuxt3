<template>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form action="" class="space-y-6">
                <!-- Input -->
                 <Input :disabled="isLoading" required id="name" label="Name" v-model="name" type="text" v-if="variant==='REGISTER'"/>
                 <Input :disabled="isLoading" required id="email" label="Email" v-model="email" type="email"/>
                 <Input :disabled="isLoading" required id="password" label="Password" v-model="password" type="password"/>

                 <div>
                    <Button :disabled="isLoading" fullWidth type="submit">
                        {{ variant==='LOGIN' ? 'Sign In' : 'Register' }}
                    </Button>
                 </div>
                 <div class="mt-6">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-300"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="bg-white px-2 text-gray-500">Or Continue with</span>
                        </div>
                    </div>
                    <div class="mt-6 flex gap-2">
                        <AuthSocialButton/>
                    </div>
                 </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    const isLoading = ref(false)
    const name = ref('')
    const email = ref('')
    const password = ref('')

    type VARIANT = 'LOGIN' | 'REGISTER'
    const variant = ref<VARIANT>('REGISTER')
</script>