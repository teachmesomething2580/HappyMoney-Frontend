<template>
  <div id="mainService">
    <div class="main_services">
      <div class="main_service" :key="service.id" v-for="(service, index) in services" :class="'main_service_'+String(Number(index)+1)">
        <a :href="service.serviceURL">
          <img :src="service.serviceIMG" alt="">
          <strong>{{ service.serviceName }}</strong>
          <span>{{ service.serviceDesc }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      services: [
        {serviceName: '해피캐시 충전', serviceDesc: '현금없어도 OK', serviceURL: '', serviceIMG: require('@/assets/css/images/index/service_1.png')},
        {serviceName: '사용여부조회', serviceDesc: '사용내역 확인', serviceURL: '', serviceIMG: require('@/assets/css/images/index/service_2.png')},
        {serviceName: '상품권 교환소', serviceDesc: '교환하고 캐시 충전', serviceURL: '', serviceIMG: require('@/assets/css/images/index/service_3.png')},
        {serviceName: '무료 충전소', serviceDesc: '무료 캐시 듬뿍 충전', serviceURL: '', serviceIMG: require('@/assets/css/images/index/service_4.png')}
      ]
    }
  }
}
</script>

<style lang="scss">
#mainService {
  background-color: #403c61;
  height: 225px;
  padding-top: 35px;
  box-sizing: content-box;
  overflow: hidden;

  > .main_services {
    display: flex;
    justify-content: center;
    align-items: center;

    > .main_service {

      &:first-child a {
        border: none;
      }

      > a {
        display: flex;
        flex-direction: column;
        padding: 0 70px;
        border-left: 1px solid #59596e;

        > img {
          padding-bottom: 22px;
        }

        > strong {
            color: #fff;
            margin-bottom: 7px;
        }

        > span {
          color: #ababc3;
          font-size: 14px;
        }
      }
    }
  }
}

@media only screen and (max-width: 800px) {
  #mainService {
    padding: 30px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;

    > .main_services {

      > .main_service {

        &:first-child a {
          padding-left: 0;
        }

        &:last-child a {
          padding-right: 0;
        }

        > a {
          padding: 0 2em;
          font-size: 0.8em;
          align-items: center;

          > img {
            width: 50px;
          }

          > span {
            font-size: 1.0em;
          }
        }
      }
    }
  }
}
</style>
