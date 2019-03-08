import {
  Component,
  OnInit,
} from '@angular/core'

@Component({
  template: `
    <div class="row clearfix">
      <div class="square one"></div>
      <div class="square two"></div>
      <div class="square three"></div>
    </div>

    <div class="row clearfix">
      <div class="square eight"></div>
      <div class="square nine"></div>
      <div class="square four"></div>
    </div>

    <div class="row clearfix">
      <div class="square seven"></div>
      <div class="square six"></div>
      <div class="square five"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1000;
    }
    
    .row .square {
      float: left;
      background: #ff8a00;
      display: block;
      overflow: hidden;
      width: 30px;
      height: 30px;
      margin: 0px 5px 5px 0;
      opacity: 0;
      /*animation*/
      /* Chrome, Safari, Opera */
      -webkit-animation-name: gotime;
      -webkit-animation-iteration-count: infinite;
      -webkit-animation-timing-function: ease-in;
      /* Standard*/
      animation-name: gotime;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in;
    }

    /*line break */
    .clearfix:after {
      visibility: hidden;
      display: block;
      font-size: 0;
      content: " ";
      clear: both;
      height: 0;
    }
    

    /*animation timing specifics -- Edit this section to for timing adjustments*/
    .one {
      /* Chrome, Safari, Opera */
      -webkit-animation-duration: 5.5s;
      -webkit-animation-delay: 0s;
      /* Standard*/
      animation-duration: 5.5s;
      animation-delay: 0s;

    }

    .two {
      /* Chrome, Safari, Opera */
      -webkit-animation-duration: 5.5s;
      -webkit-animation-delay: 0.15s;
      /* Standard*/
      animation-duration: 5.5s;
      animation-delay: 0.15s;
    }

    .three {
      /* Chrome, Safari, Opera */
      -webkit-animation-duration: 5.5s;
      -webkit-animation-delay: 0.25s;
      /* Standard*/
      animation-duration: 5.5s;
      animation-delay: 0.25s;
    }

    .four {
      /* Chrome, Safari, Opera */
      -webkit-animation-duration: 5.5s;
      -webkit-animation-delay: 0.25s;
      /* Standard*/
      animation-duration: 5.5s;
      animation-delay: 0.25s;
    }

    .five {
      /* Chrome, Safari, Opera */
      -webkit-animation-duration: 5.5s;
      -webkit-animation-delay: .3s;
      /* Standard*/
      animation-duration: 5.5s;
      animation-delay: .3s;
    }

    .six {
      /* Chrome, Safari, Opera */
      -webkit-animation-duration: 5.5s;
      -webkit-animation-delay: .35s;
      /* Standard*/
      animation-duration: 5.5s;
      animation-delay: .35s;
    }

    .seven {
      /* Chrome, Safari, Opera */
      -webkit-animation-duration: 5.5s;
      -webkit-animation-delay: .4s;
      /* Standard*/
      animation-duration: 5.5s;
      animation-delay: .4s;
    }

    .eight {
      /* Chrome, Safari, Opera */
      -webkit-animation-duration: 5.5s;
      -webkit-animation-delay: .45s;
      /* Standard*/
      animation-duration: 5.5s;
      animation-delay: .45s;
    }

    .nine {
      /* Chrome, Safari, Opera */
      -webkit-animation-duration: 5.5s;
      -webkit-animation-delay: .5s;
      /* Standard*/
      animation-duration: 5.5s;
      animation-delay: .5s;
    }

    /* Animation -- Chrome, Safari, Opera */
    @-webkit-keyframes gotime {
      /*--ORANGE-- */
      0% {
        background: #ff8a00;
        opacity: 0;
      }
      1.5% {
        background: #ff8a00;
        opacity: 1;
      }
      3% {
        background: #ff8a00;
        opacity: 0.9;
      }
      4.5% {
        background: #ff8a00;
        opacity: 0.8;
      }
      6% {
        background: #ff8a00;
        opacity: 0.7;
      }
      7.5% {
        background: #ff8a00;
        opacity: 0.6;
      }
      9% {
        background: #ff8a00;
        opacity: 0.5;
      }
      10.5% {
        background: #ff8a00;
        opacity: 0.4;
      }
      12% {
        background: #ff8a00;
        opacity: 0.3;
      }
      13.5% {
        background: #ff8a00;
        opacity: 0.2;
      }
      15% {
        background: #ff8a00;
        opacity: 0.1;
      }
      /*--YELLOW--*/
      16.5% {
        background: #ffd51c;
        opacity: 1;
      }
      18% {
        background: #ffd51c;
        opacity: 0.9;
      }
      19.5% {
        background: #ffd51c;
        opacity: 0.8;
      }
      21% {
        background: #ffd51c;
        opacity: 0.7;
      }
      22.5% {
        background: #ffd51c;
        opacity: 0.6;
      }
      24% {
        background: #ffd51c;
        opacity: 0.5;
      }
      25.5% {
        background: #ffd51c;
        opacity: 0.4;
      }
      27% {
        background: #ffd51c;
        opacity: 0.3;
      }
      28.5% {
        background: #ffd51c;
        opacity: 0.2;
      }
      30% {
        background: #ffd51c;
        opacity: 0.1;
      }
      /*--RED--*/
      31.5% {
        background: #f5836d;
        opacity: 1;
      }
      33% {
        background: #f5836d;
        opacity: 0.9;
      }
      34.5% {
        background: #f5836d;
        opacity: 0.8;
      }
      36% {
        background: #f5836d;
        opacity: 0.7;
      }
      37.5% {
        background: #f5836d;
        opacity: 0.6;
      }
      39% {
        background: #f5836d;
        opacity: 0.5;
      }
      40.5% {
        background: #f5836d;
        opacity: 0.4;
      }
      42% {
        background: #f5836d;
        opacity: 0.3;
      }
      43.5% {
        background: #f5836d;
        opacity: 0.2;
      }
      45% {
        background: #f5836d;
        opacity: 0.1;
      }
      /*--PURPLE--*/
      46.5% {
        background: #9575a7;
        opacity: 1;
      }
      48% {
        background: #9575a7;
        opacity: 0.9;
      }
      49.5% {
        background: #9575a7;
        opacity: 0.8;
      }
      51% {
        background: #9575a7;
        opacity: 0.7;
      }
      52.5% {
        background: #9575a7;
        opacity: 0.6;
      }
      54% {
        background: #9575a7;
        opacity: 0.5;
      }
      55.5% {
        background: #9575a7;
        opacity: 0.4;
      }
      57% {
        background: #9575a7;
        opacity: 0.3;
      }
      58.5% {
        background: #9575a7;
        opacity: 0.2;
      }
      60% {
        background: #9575a7;
        opacity: 0.1;
      }
      /*--BLUE--*/
      61.5% {
        background: #5cc5e8;
        opacity: 1;
      }
      63% {
        background: #5cc5e8;
        opacity: 0.9;
      }
      64.5% {
        background: #5cc5e8;
        opacity: 0.8;
      }
      66% {
        background: #5cc5e8;
        opacity: 0.7;
      }
      67.5% {
        background: #5cc5e8;
        opacity: 0.6;
      }
      69% {
        background: #5cc5e8;
        opacity: 0.5;
      }
      70.5% {
        background: #5cc5e8;
        opacity: 0.4;
      }
      72% {
        background: #5cc5e8;
        opacity: 0.3;
      }
      73.5% {
        background: #5cc5e8;
        opacity: 0.2;
      }
      75% {
        background: #5cc5e8;
        opacity: 0.1;
      }
      /*--GREEN--*/
      76.5% {
        background: #3dc0a7;
        opacity: 1;
      }
      78% {
        background: #3dc0a7;
        opacity: 0.9;
      }
      79.5% {
        background: #3dc0a7;
        opacity: 0.8;
      }
      81% {
        background: #3dc0a7;
        opacity: 0.7;
      }
      82.5% {
        background: #3dc0a7;
        opacity: 0.6;
      }
      84% {
        background: #3dc0a7;
        opacity: 0.5;
      }
      85.5% {
        background: #3dc0a7;
        opacity: 0.4;
      }
      87% {
        background: #3dc0a7;
        opacity: 0.3;
      }
      88.5% {
        background: #3dc0a7;
        opacity: 0.2;
      }
      90% {
        background: #3dc0a7;
        opacity: 0.1;
      }
    -- 100 %

    {
      background: #ff8a00
    ;
      opacity: 0.0
    ;
    }
    }

    /*Animation -- Standard*/
    @keyframes gotime {
      /*--ORANGE-- */
      0% {
        background: #ff8a00;
        opacity: 0;
      }
      1.5% {
        background: #ff8a00;
        opacity: 1;
      }
      3% {
        background: #ff8a00;
        opacity: 0.9;
      }
      4.5% {
        background: #ff8a00;
        opacity: 0.8;
      }
      6% {
        background: #ff8a00;
        opacity: 0.7;
      }
      7.5% {
        background: #ff8a00;
        opacity: 0.6;
      }
      9% {
        background: #ff8a00;
        opacity: 0.5;
      }
      10.5% {
        background: #ff8a00;
        opacity: 0.4;
      }
      12% {
        background: #ff8a00;
        opacity: 0.3;
      }
      13.5% {
        background: #ff8a00;
        opacity: 0.2;
      }
      15% {
        background: #ff8a00;
        opacity: 0.1;
      }
      /*--YELLOW--*/
      16.5% {
        background: #ffd51c;
        opacity: 1;
      }
      18% {
        background: #ffd51c;
        opacity: 0.9;
      }
      19.5% {
        background: #ffd51c;
        opacity: 0.8;
      }
      21% {
        background: #ffd51c;
        opacity: 0.7;
      }
      22.5% {
        background: #ffd51c;
        opacity: 0.6;
      }
      24% {
        background: #ffd51c;
        opacity: 0.5;
      }
      25.5% {
        background: #ffd51c;
        opacity: 0.4;
      }
      27% {
        background: #ffd51c;
        opacity: 0.3;
      }
      28.5% {
        background: #ffd51c;
        opacity: 0.2;
      }
      30% {
        background: #ffd51c;
        opacity: 0.1;
      }
      /*--RED--*/
      31.5% {
        background: #f5836d;
        opacity: 1;
      }
      33% {
        background: #f5836d;
        opacity: 0.9;
      }
      34.5% {
        background: #f5836d;
        opacity: 0.8;
      }
      36% {
        background: #f5836d;
        opacity: 0.7;
      }
      37.5% {
        background: #f5836d;
        opacity: 0.6;
      }
      39% {
        background: #f5836d;
        opacity: 0.5;
      }
      40.5% {
        background: #f5836d;
        opacity: 0.4;
      }
      42% {
        background: #f5836d;
        opacity: 0.3;
      }
      43.5% {
        background: #f5836d;
        opacity: 0.2;
      }
      45% {
        background: #f5836d;
        opacity: 0.1;
      }
      /*--PURPLE--*/
      46.5% {
        background: #9575a7;
        opacity: 1;
      }
      48% {
        background: #9575a7;
        opacity: 0.9;
      }
      49.5% {
        background: #9575a7;
        opacity: 0.8;
      }
      51% {
        background: #9575a7;
        opacity: 0.7;
      }
      52.5% {
        background: #9575a7;
        opacity: 0.6;
      }
      54% {
        background: #9575a7;
        opacity: 0.5;
      }
      55.5% {
        background: #9575a7;
        opacity: 0.4;
      }
      57% {
        background: #9575a7;
        opacity: 0.3;
      }
      58.5% {
        background: #9575a7;
        opacity: 0.2;
      }
      60% {
        background: #9575a7;
        opacity: 0.1;
      }
      /*--BLUE--*/
      61.5% {
        background: #5cc5e8;
        opacity: 1;
      }
      63% {
        background: #5cc5e8;
        opacity: 0.9;
      }
      64.5% {
        background: #5cc5e8;
        opacity: 0.8;
      }
      66% {
        background: #5cc5e8;
        opacity: 0.7;
      }
      67.5% {
        background: #5cc5e8;
        opacity: 0.6;
      }
      69% {
        background: #5cc5e8;
        opacity: 0.5;
      }
      70.5% {
        background: #5cc5e8;
        opacity: 0.4;
      }
      72% {
        background: #5cc5e8;
        opacity: 0.3;
      }
      73.5% {
        background: #5cc5e8;
        opacity: 0.2;
      }
      75% {
        background: #5cc5e8;
        opacity: 0.1;
      }
      /*--GREEN--*/
      76.5% {
        background: #3dc0a7;
        opacity: 1;
      }
      78% {
        background: #3dc0a7;
        opacity: 0.9;
      }
      79.5% {
        background: #3dc0a7;
        opacity: 0.8;
      }
      81% {
        background: #3dc0a7;
        opacity: 0.7;
      }
      82.5% {
        background: #3dc0a7;
        opacity: 0.6;
      }
      84% {
        background: #3dc0a7;
        opacity: 0.5;
      }
      85.5% {
        background: #3dc0a7;
        opacity: 0.4;
      }
      87% {
        background: #3dc0a7;
        opacity: 0.3;
      }
      88.5% {
        background: #3dc0a7;
        opacity: 0.2;
      }
      90% {
        background: #3dc0a7;
        opacity: 0.1;
      }
      100 %{
        background: #ff8a00;
        opacity: 0.0;
      }
    }
  `],
  selector: 'loading-spinner',
})
export class LoadingSpinnerComponent {}
