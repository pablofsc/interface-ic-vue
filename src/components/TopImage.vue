<template>
    <div class="text-center topImage" title="Este site não tem relação com a ANS e os dados podem estar errados ou desatualizados.">
        <img src="../assets/ans.png" />
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
    height: 75px;
    margin: 25px 0;
}
</style>
