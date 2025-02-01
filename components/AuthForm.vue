<template>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
            <form action="" class="space-y-6">
                <!-- Input -->
                 <Input :disabled="isLoading" required id="name" label="Name" v-model="name"/>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    const isLoading = ref(false)
    const name = ref('')
</script>