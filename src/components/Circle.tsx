import { motion } from 'framer-motion'

const variants = [
  'M95.4594 89.8025C68.3172 89.8025 18.8399 94.8532 5.3509 64.2435C-6.79332 36.6855 16.3319 16.2515 40.4293 7.51817C51.4966 3.5072 64.5484 3.811 76.0946 3.01927C88.6419 2.15888 103.809 -0.31614 115.998 4.3885C131.191 10.2526 132.715 20.5603 133.602 35.294C134.203 45.2688 135.331 57.0811 132.298 66.8516C130.476 72.7242 120.949 83.5125 115.411 86.2816',
  'M110 101C103.185 101 96.3704 101 89.5556 101C69.6886 101 48.1941 103.119 28.7778 98.2222C13.1831 94.2897 1.59198 81.3693 2.5 64.7222C3.95971 37.9609 30.5271 18.8247 53.1111 9.66667C62.5566 5.83641 86.2994 -4.12135 94.5556 6.66667C104.667 19.8784 91.4016 41.6635 84.8333 53.1111C76.4754 67.6777 67.2357 81.6573 59.0556 96.3333C56.2702 101.331 52.4 106.4 51 112',
  'M100.653 123.211C76.008 123.211 55.3208 120.562 34.9954 104.955C14.2426 89.0196 -10.0247 64.4388 8.58878 38.1232C34.3167 1.74921 81.2311 2.09365 120.996 2.32756C142.108 2.45175 165.804 6.91427 178.113 26.0609C183.611 34.6144 183.404 51.3988 179.873 60.4221C175.032 72.7946 163.957 87.5723 152.749 95.0442C125.613 113.135 96.0398 126.732 63.0973 126.732',
  'M59.6396 108.84C34.4484 83.6489 13.5488 53.0256 3.5663 18.4708C-0.981017 2.73006 8.80306 3.39648 21.8879 2.62678C52.1208 0.848377 83.4936 4.93177 111.67 16.3843C122.907 20.9513 166.559 44.7354 144.141 59.5477C117.036 77.4566 83.8938 89.2798 52.5979 97.1038',
  'M25.1808 102.956C23.8413 90.2314 14.189 76.559 9.40201 64.8787C4.75496 53.5399 -2.09549 33.8619 4.8379 21.9761C14.0665 6.15571 33.1851 3.11383 50.0878 2.28527C73.231 1.1508 100.873 1.31218 119.723 17.0208C127.266 23.3068 124.939 36.7585 124.939 45.5139C124.939 59.2976 124.887 70.6107 116.789 82.3528C115.238 84.6012 99.6506 101.672 96.7721 95.9147'
]

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0
  },
  show: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut'
    }
  }
}

interface Props {
  isAnimating: boolean
}

function Circle({
  isAnimating
}: Props): React.ReactElement {
  return (
    <svg
      width="150"
      height="200"
      viewBox="0 0 200 250"
      className=" absolute z-0 top-0"
    >
      {!isAnimating ? null : (
        <motion.path
          d={variants.at(
            Math.floor(Math.random() * variants.length) ?? 0
          )}
          fill="none"
          stroke="#414241"
          strokeWidth="3"
          variants={pathVariants}
          initial="hidden"
          animate={isAnimating ? 'show' : 'hidden'}
        />
      )}
    </svg>
  )
}

export default Circle
