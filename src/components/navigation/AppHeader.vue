<template>
  <div class="" id="mobile-drawer">
    <div class="py-4 px-6 w-full lg:z-10 md:z-10">
      <div class="flex justify-between items-center">
        <span class="lg:block md:block hidden">
          <i-icon icon="grommet-icons:menu" width="28px" class="text-primary" />
        </span>

        <div class="lg:hidden md:hidden flex justify-center">
          <router-link to="/app/dashboard"
            ><img src="@/assets/img/logo-spread.svg" width="180" alt=""
          /></router-link>
        </div>

        <span role="button" class="lg:hidden md:hidden block" @click="drawer = !drawer">
          <i-icon icon="grommet-icons:menu" width="28px" class="text-primary" />
        </span>
      </div>
    </div>
    <div class="">
      <Sidebar v-model:visible="drawer" position="right" style="width: 100%">
        <template #container="{ closeCallback }">
          <div class="h-screen bg-primaryLight px-6 pb-28 flex flex-col z-20">
            <div>
              <span role="button" class="flex justify-end mt-4" @click="closeCallback">
                <i-icon icon="gg:close-o" class="text-dark text-2xl" />
              </span>
            </div>
            <div class="flex flex-col justify-between h-[80vh]">
              <div class="mt-4">
                <!-- <div class="flex justify-center mt-2">
                  <router-link to="/app/dashboard"
                    ><img src="@/assets/img/logo-spread.svg" width="180" alt=""
                  /></router-link>
                </div>
                <hr class="my-6 bg-gray-200" /> -->

                <ul class="p-0 flex flex-col gap-4 mt-6">
                  <li v-for="item in menu" :key="item.id" class="w-full px-4">
                    <div class="menu-item w-full">
                      <span
                        class="menu-item-link flex justify-between w-full py-3"
                        :role="item.header ? '' : 'button'"
                        @click="item.hasChildren ? openSubMenu(item) : goToLink(item)"
                        :class="[item.parent === routeParent ? 'text-primary' : 'dark']"
                      >
                        <div class="flex items-center gap-2">
                          <i-icon :icon="item.icon" v-if="item.icon" class="menu-item-icon" />
                          <span class="flex flex-column">
                            <span
                              class="text-sm capitalize"
                              :class="item.header ? 'menu-title-header' : 'menu-title'"
                            >
                              {{ item.title }}
                            </span>
                          </span>
                        </div>
                        <span v-if="item.hasChildren">
                          <i-icon
                            :icon="
                              subMenu === item.parent ? 'prime:angle-down' : 'prime:angle-right'
                            "
                            width="22px"
                          />
                        </span>
                      </span>
                      <div class="flex flex-col ml-8 gap-3 mt-2" v-if="subMenu === item.parent">
                        <span
                          role="button"
                          class=""
                          v-for="(data, idx) in item.children"
                          :key="idx"
                          @click="goToLink(data)"
                        >
                          <span
                            class="sub-menu-items flex text-[13px] gap-2 items-center"
                            :class="[
                              data.subItem === subMenuRouteName ? 'text-primary' : 'text-gray-100'
                            ]"
                          >
                            <i-icon :icon="data.icon" class="menu-item-icon" />
                            <span class="sub-menu-title"> {{ data.title }} </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div
                class="flex gap-2 px-4 items-center text-white text-[13px]"
                role="button"
                @click="logout"
              >
                <i-icon icon="fe:logout" class="menu-item-icon text-[20px]" />
                <span class="flex flex-column capitalize">
                  <span> Sign Out </span>
                </span>
              </div>
            </div>
          </div>
        </template>
      </Sidebar>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import image from '@/assets/img/no-user.png'
// import AppDrawer from "./MobileDrawer.vue";
export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  components: {},

  data() {
    return {
      drawer: false,
      image
    }
  },

  methods: {
    ...mapActions('drawer', ['setSubMenu']),
    goToLink(item) {
      if (item.parent === 'sign-out') {
        this.drawer = false
        this.logout()
      } else {
        this.drawer = false
        this.$router.push(item.url).catch(() => {})
      }
    },

    openSubMenu(item) {
      let value = this.subMenu === item.parent ? null : item.parent
      this.setSubMenu(value)
    },

    logout() {
      this.drawer = false
      this.$swal
        .fire({
          title: 'Uhhhh! 😔',
          text: 'Are you sure you want to log out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, logout!'
        })
        .then((result) => {
          console.log(result, 'kkk')
          if (result.isConfirmed) {
            this.userLogout()
          }
        })
    },

    userLogout() {
      this.$store.dispatch('auth/logout')
      this.$swal
        .fire({
          title: 'Woo hoo 😫',
          text: 'Logged out succesfully',
          icon: 'success',
          confirmButtonText: 'Ok!'
        })
        .then((result) => {
          console.log(result, 'kkk')
          if (result.isConfirmed) {
            this.$router.go()
          }
        })
    }
  },

  computed: {
    routeName() {
      return this.$route.meta.name
    },
    routeParent() {
      return this.$route.meta.parent
    },
    user() {
      return this.$store.getters['auth/getUser']
    },
    subMenuRouteName() {
      return this.$route.meta.subName
    },
    ...mapState('drawer', {
      subMenu: (state) => state.subMenu
    })

    //   userMeta() {
    //     return this.$store.getters["auth/getUserMeta"];
    //   },
  }
}
</script>

<style>
#mobile-drawer ul li .menu-item-link {
  color: var(--gray-900);
  font-weight: 500;
  display: flex;
  display: inline-flex;
  display: -webkit-flex;
  gap: 8px;
  font-size: 13px;
  padding: 0.6rem;
  justify-content: space-between;
  align-items: center;
}

#mobile-drawer ul li .menu-item-link:hover {
  /* background-color: var(--secondary-color); */
  color: var(--secondary-color);
  transition: all 0.3s;
}

#mobile-drawer .menu-icon {
  background-color: var(--white);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /* margin-bottom: 30px; */
}

#mobile-drawer ul li .menu-item-link.active-link {
  background: linear-gradient(to left, var(--primary-color), var(--secondary-color));
  color: var(--white);
  font-weight: 500;
  border-radius: 6px;
}

#mobile-drawer ul li .menu-item-link .menu-item-icon,
#mobile-drawer ul li .sub-menu .sub-menu-items .menu-item-icon {
  font-size: 30px;
  background: #fff;
  color: var(--secondary-color);
  padding: 5px;
  border-radius: 50%;
}

#mobile-drawer.collapsible ul li .sub-menu .sub-menu-items {
  padding: 1em 0 1em 1.8rem;
}

#mobile-drawer ul li .sub-menu .sub-menu-items {
  color: var(--secondary-100);
  font-weight: 500;
  font-size: 14px;
  padding: 1.3em 0 1em 2.5rem;
}

#mobile-drawer ul li .sub-menu .sub-menu-items.active-sub-menu {
  background-color: var(--secondary-color);
  color: var(--gray-800);
}
</style>
