<style scoped>
.example{
	width: 200px;
	height: 200px;	

}
#example1 {
	box-sizing: border-box;
    background: gold;
    border: 20px dashed lightblue;
    position: relative;
}
#example1:before{
	content:"";
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background: white;
}
</style>
<template>
    <section>
    	<br>
        <section class="example" id="example1">example1</section>
        <br>
    </section>
</template>
<script>
export default {};
</script>