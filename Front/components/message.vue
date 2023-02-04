<template>
  <div>
    <p><span style="color: #3CA60A; font-weight: bold;">{{message.name}}</span>:  {{message.msg}}</p>
    <hr>
  </div>
</template>

<script>
export default {
  props:["message"],
}
</script>
