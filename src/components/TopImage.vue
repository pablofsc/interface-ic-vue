<template>
    <div class="text-center topImage shadow">
        <img src="../assets/ic.png" style="" />
    </div>
</template>

<script>
export default { name: "TopImage" };
</script>

<style scoped>
.topImage {
    width: 100%;
    margin-bottom: 50px;
    background-color: #ffffff;
}

img {
    object-fit: cover;
    width: 300px;
    height: 125px;
}
</style>