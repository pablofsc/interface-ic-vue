<template>
    <div class="text-center topImage">
        <img src="../assets/ic.png" style="" />
    </div>
</template>

<script>
export default { name: "TopImage" };
</script>

<style scoped>
.topImage {
    width: 100%;
    margin: 50px 0 0 0;
}

img {
    object-fit: cover;
    width: 300px;
    height: 125px;
}
</style>