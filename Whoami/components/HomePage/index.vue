<template>
  <div>
    <main class="flex h-[100vh]">
      <aside class="w-[480px] shadow-sm">
        <HomePageTheHeader />
        <HomePageSearchBar class="box-container" />
        <HomePageChatBox />
      </aside>
      <section class="fl flex-grow">
        <HomePageChatRoom />
      </section>
    </main>
  </div>
</template>
