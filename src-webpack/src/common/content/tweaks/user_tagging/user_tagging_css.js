export function getUserTaggingCSS() {
	const iconTag = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M96.5 160L96.5 309.5C96.5 326.5 103.2 342.8 115.2 354.8L307.2 546.8C332.2 571.8 372.7 571.8 397.7 546.8L547.2 397.3C572.2 372.3 572.2 331.8 547.2 306.8L355.2 114.8C343.2 102.7 327 96 310 96L160.5 96C125.2 96 96.5 124.7 96.5 160zM208.5 176C226.2 176 240.5 190.3 240.5 208C240.5 225.7 226.2 240 208.5 240C190.8 240 176.5 225.7 176.5 208C176.5 190.3 190.8 176 208.5 176z'/%3E%3C/svg%3E`;
	const iconStar = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M341.5 45.1C337.4 37.1 329.1 32 320.1 32C311.1 32 302.8 37.1 298.7 45.1L225.1 189.3L65.2 214.7C56.3 216.1 48.9 222.4 46.1 231C43.3 239.6 45.6 249 51.9 255.4L166.3 369.9L141.1 529.8C139.7 538.7 143.4 547.7 150.7 553C158 558.3 167.6 559.1 175.7 555L320.1 481.6L464.4 555C472.4 559.1 482.1 558.3 489.4 553C496.7 547.7 500.4 538.8 499 529.8L473.7 369.9L588.1 255.4C594.5 249 596.7 239.6 593.9 231C591.1 222.4 583.8 216.1 574.8 214.7L415 189.3L341.5 45.1z'/%3E%3C/svg%3E`;
	const iconHeart = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M305 151.1L320 171.8L335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1L576 231.7C576 343.9 436.1 474.2 363.1 529.9C350.7 539.3 335.5 544 320 544C304.5 544 289.2 539.4 276.9 529.9C203.9 474.2 64 343.9 64 231.7L64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1z'/%3E%3C/svg%3E`;
	const iconCrown = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M345 151.2C354.2 143.9 360 132.6 360 120C360 97.9 342.1 80 320 80C297.9 80 280 97.9 280 120C280 132.6 285.9 143.9 295 151.2L226.6 258.8C216.6 274.5 195.3 278.4 180.4 267.2L120.9 222.7C125.4 216.3 128 208.4 128 200C128 177.9 110.1 160 88 160C65.9 160 48 177.9 48 200C48 221.8 65.5 239.6 87.2 240L119.8 457.5C124.5 488.8 151.4 512 183.1 512L456.9 512C488.6 512 515.5 488.8 520.2 457.5L552.8 240C574.5 239.6 592 221.8 592 200C592 177.9 574.1 160 552 160C529.9 160 512 177.9 512 200C512 208.4 514.6 216.3 519.1 222.7L459.7 267.3C444.8 278.5 423.5 274.6 413.5 258.9L345 151.2z'/%3E%3C/svg%3E`;
	const iconPeace = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M288 64C305.7 64 320 78.3 320 96L320 304L256 304L256 96C256 78.3 270.3 64 288 64zM384 224C401.7 224 416 238.3 416 256L416 320C416 337.7 401.7 352 384 352C366.3 352 352 337.7 352 320L352 256C352 238.3 366.3 224 384 224zM448 288C448 270.3 462.3 256 480 256C497.7 256 512 270.3 512 288L512 352C512 369.7 497.7 384 480 384C462.3 384 448 369.7 448 352L448 288zM157.3 115.2L239.9 304L170.1 304L98.7 140.8C91.6 124.6 99 105.8 115.2 98.7C131.4 91.6 150.2 99 157.3 115.2zM184.3 336.5L184.1 336L280 336C302.1 336 320 353.9 320 376C320 398.1 302.1 416 280 416L224 416C215.2 416 208 423.2 208 432C208 440.8 215.2 448 224 448L280 448C319.8 448 352 415.8 352 376L352 375.4C361.4 380.8 372.3 384 384 384C397.2 384 409.4 380 419.6 373.2C428.3 398.1 452.1 416 480 416C491.7 416 502.6 412.9 512 407.4L512 416C512 504.4 440.4 576 352 576L290.3 576C247.9 576 207.2 559.1 177.2 529.1L165.5 517.5C141.5 493.5 128 460.9 128 427L128 400C128 367.3 152.6 340.3 184.3 336.5z'/%3E%3C/svg%3E`;
	const iconThumbsUp = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M144 224C161.7 224 176 238.3 176 256L176 512C176 529.7 161.7 544 144 544L96 544C78.3 544 64 529.7 64 512L64 256C64 238.3 78.3 224 96 224L144 224zM334.6 80C361.9 80 384 102.1 384 129.4L384 133.6C384 140.4 382.7 147.2 380.2 153.5L352 224L512 224C538.5 224 560 245.5 560 272C560 291.7 548.1 308.6 531.1 316C548.1 323.4 560 340.3 560 360C560 383.4 543.2 402.9 521 407.1C525.4 414.4 528 422.9 528 432C528 454.2 513 472.8 492.6 478.3C494.8 483.8 496 489.8 496 496C496 522.5 474.5 544 448 544L360.1 544C323.8 544 288.5 531.6 260.2 508.9L248 499.2C232.8 487.1 224 468.7 224 449.2L224 262.6C224 247.7 227.5 233 234.1 219.7L290.3 107.3C298.7 90.6 315.8 80 334.6 80z'/%3E%3C/svg%3E`;
	const iconTick = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z'/%3E%3C/svg%3E`;
	const iconUser = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'%3E%3Cpath d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z'/%3E%3C/svg%3E`;
	const iconMod = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M256 312C322.3 312 376 258.3 376 192C376 125.7 322.3 72 256 72C189.7 72 136 125.7 136 192C136 258.3 189.7 312 256 312zM226.3 368C127.8 368 48 447.8 48 546.3C48 562.7 61.3 576 77.7 576L329.2 576C293 533.4 272 478.5 272 420.4L272 389.3C272 382 273 374.8 274.9 368L226.3 368zM477.3 552.5L464 558.8L464 370.7L560 402.7L560 422.3C560 478.1 527.8 528.8 477.3 552.6zM453.9 323.5L341.9 360.8C328.8 365.2 320 377.4 320 391.2L320 422.3C320 496.7 363 564.4 430.2 596L448.7 604.7C453.5 606.9 458.7 608.1 463.9 608.1C469.1 608.1 474.4 606.9 479.1 604.7L497.6 596C565 564.3 608 496.6 608 422.2L608 391.1C608 377.3 599.2 365.1 586.1 360.7L474.1 323.4C467.5 321.2 460.4 321.2 453.9 323.4z'/%3E%3C/svg%3E`;
	const iconGame = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M448 128C554 128 640 214 640 320C640 426 554 512 448 512L192 512C86 512 0 426 0 320C0 214 86 128 192 128L448 128zM192 240C178.7 240 168 250.7 168 264L168 296L136 296C122.7 296 112 306.7 112 320C112 333.3 122.7 344 136 344L168 344L168 376C168 389.3 178.7 400 192 400C205.3 400 216 389.3 216 376L216 344L248 344C261.3 344 272 333.3 272 320C272 306.7 261.3 296 248 296L216 296L216 264C216 250.7 205.3 240 192 240zM432 336C414.3 336 400 350.3 400 368C400 385.7 414.3 400 432 400C449.7 400 464 385.7 464 368C464 350.3 449.7 336 432 336zM496 240C478.3 240 464 254.3 464 272C464 289.7 478.3 304 496 304C513.7 304 528 289.7 528 272C528 254.3 513.7 240 496 240z'/%3E%3C/svg%3E`;
	const iconPaw = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M298.5 156.9C312.8 199.8 298.2 243.1 265.9 253.7C233.6 264.3 195.8 238.1 181.5 195.2C167.2 152.3 181.8 109 214.1 98.4C246.4 87.8 284.2 114 298.5 156.9zM164.4 262.6C183.3 295 178.7 332.7 154.2 346.7C129.7 360.7 94.5 345.8 75.7 313.4C56.9 281 61.4 243.3 85.9 229.3C110.4 215.3 145.6 230.2 164.4 262.6zM133.2 465.2C185.6 323.9 278.7 288 320 288C361.3 288 454.4 323.9 506.8 465.2C510.4 474.9 512 485.3 512 495.7L512 497.3C512 523.1 491.1 544 465.3 544C453.8 544 442.4 542.6 431.3 539.8L343.3 517.8C328 514 312 514 296.7 517.8L208.7 539.8C197.6 542.6 186.2 544 174.7 544C148.9 544 128 523.1 128 497.3L128 495.7C128 485.3 129.6 474.9 133.2 465.2zM485.8 346.7C461.3 332.7 456.7 295 475.6 262.6C494.5 230.2 529.6 215.3 554.1 229.3C578.6 243.3 583.2 281 564.3 313.4C545.4 345.8 510.3 360.7 485.8 346.7zM374.1 253.7C341.8 243.1 327.2 199.8 341.5 156.9C355.8 114 393.6 87.8 425.9 98.4C458.2 109 472.8 152.3 458.5 195.2C444.2 238.1 406.4 264.3 374.1 253.7z'/%3E%3C/svg%3E`;
	const iconCar = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M199.2 181.4L173.1 256L466.9 256L440.8 181.4C436.3 168.6 424.2 160 410.6 160L229.4 160C215.8 160 203.7 168.6 199.2 181.4zM103.6 260.8L138.8 160.3C152.3 121.8 188.6 96 229.4 96L410.6 96C451.4 96 487.7 121.8 501.2 160.3L536.4 260.8C559.6 270.4 576 293.3 576 320L576 512C576 529.7 561.7 544 544 544L512 544C494.3 544 480 529.7 480 512L480 480L160 480L160 512C160 529.7 145.7 544 128 544L96 544C78.3 544 64 529.7 64 512L64 320C64 293.3 80.4 270.4 103.6 260.8zM192 368C192 350.3 177.7 336 160 336C142.3 336 128 350.3 128 368C128 385.7 142.3 400 160 400C177.7 400 192 385.7 192 368zM480 400C497.7 400 512 385.7 512 368C512 350.3 497.7 336 480 336C462.3 336 448 350.3 448 368C448 385.7 462.3 400 480 400z'/%3E%3C/svg%3E`;
	const iconRocket = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M192 384L88.5 384C63.6 384 48.3 356.9 61.1 335.5L114 247.3C122.7 232.8 138.3 224 155.2 224L250.2 224C326.3 95.1 439.8 88.6 515.7 99.7C528.5 101.6 538.5 111.6 540.3 124.3C551.4 200.2 544.9 313.7 416 389.8L416 484.8C416 501.7 407.2 517.3 392.7 526L304.5 578.9C283.2 591.7 256 576.3 256 551.5L256 448C256 412.7 227.3 384 192 384L191.9 384zM464 224C464 197.5 442.5 176 416 176C389.5 176 368 197.5 368 224C368 250.5 389.5 272 416 272C442.5 272 464 250.5 464 224z'/%3E%3C/svg%3E`;
	const iconPawn = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M320 32C386.3 32 440 85.7 440 152C440 179 431.1 203.9 416 224C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288L405.3 288L432 448L488.2 518.3C493.2 524.6 496 532.4 496 540.5C496 560.1 480.1 576 460.5 576L179.5 576C159.9 576 144 560.1 144 540.5C144 532.4 146.7 524.6 151.8 518.3L208 448L234.7 288L224 288C206.3 288 192 273.7 192 256C192 238.3 206.3 224 224 224C208.9 203.9 200 179 200 152C200 85.7 253.7 32 320 32z'/%3E%3C/svg%3E`;
	const iconLemon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M544 160C544 124.7 515.3 96 480 96C473.4 96 467 97 461 98.9C438.5 105.9 412.9 113.8 390 107.9C314.8 88.8 233.6 118.9 176.3 176.2C119 233.5 88.8 314.8 107.9 390C113.7 412.9 105.9 438.4 98.9 461C97 467 96 473.4 96 480C96 515.3 124.7 544 160 544C166.6 544 173 543 179.1 541.1C201.6 534.1 227.2 526.2 250.1 532.1C325.3 551.2 406.5 521.1 463.8 463.8C521.1 406.5 551.2 325.2 532.1 250C526.3 227.1 534.1 201.6 541.1 179C543 173 544 166.6 544 159.9zM318.7 207C266.7 222.2 222.2 266.7 207 318.7C203.3 331.4 189.9 338.7 177.2 335C164.5 331.3 157.2 318 161 305.3C180.8 237.6 237.6 180.8 305.3 161C318 157.3 331.4 164.6 335.1 177.3C338.8 190 331.5 203.4 318.8 207.1z'/%3E%3C/svg%3E`;
	const iconThumbsDown = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M448 96C474.5 96 496 117.5 496 144C496 150.3 494.7 156.2 492.6 161.7C513 167.2 528 185.8 528 208C528 217.1 525.4 225.6 521 232.9C543.2 237.1 560 256.6 560 280C560 299.7 548.1 316.6 531.1 324C548.1 331.4 560 348.3 560 368C560 394.5 538.5 416 512 416L352 416L380.2 486.4C382.7 492.7 384 499.5 384 506.3L384 510.5C384 537.8 361.9 559.9 334.6 559.9C315.9 559.9 298.8 549.3 290.4 532.6L234.1 420.3C227.4 407 224 392.3 224 377.4L224 190.8C224 171.4 232.9 153 248 140.8L260.2 131.1C288.6 108.4 323.8 96 360.1 96L448 96zM144 160C161.7 160 176 174.3 176 192L176 448C176 465.7 161.7 480 144 480L96 480C78.3 480 64 465.7 64 448L64 192C64 174.3 78.3 160 96 160L144 160z'/%3E%3C/svg%3E`;
	const iconBan = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M367.2 412.5L99.5 144.8C77.1 176.1 64 214.5 64 256c0 106 86 192 192 192c41.5 0 79.9-13.1 111.2-35.5zm45.3-45.3C434.9 335.9 448 297.5 448 256c0-106-86-192-192-192c-41.5 0-79.9 13.1-111.2 35.5L412.5 367.2zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z'/%3E%3C/svg%3E`;
	const iconSwear = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M328 64C305.9 64 288 81.9 288 104L288 268.2C279.5 260.6 268.3 256 256 256C229.5 256 208 277.5 208 304L208 384C208 392.8 200.8 400 192 400C183.2 400 176 392.8 176 384L176 328.3C174 329.7 172.1 331.3 170.2 332.8L151 348.8C136.4 361 128 379 128 398L128 436C128 474 144.9 510 174.1 534.3L179.5 538.8C208.3 562.8 244.5 575.9 281.9 575.9L400 576C470.7 576 528 518.7 528 448L528 352C528 325.5 506.5 304 480 304C467.6 304 456.4 308.7 447.9 316.3C446 291.5 425.3 272 400 272C387.7 272 376.5 276.6 368 284.2L368 104C368 81.9 350.1 64 328 64z'/%3E%3C/svg%3E`;
	const iconToxic = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 640'%3E%3Cpath d='M292 76.6C292 68.3 284.4 62.1 276.5 64.5C215.6 83.3 171.4 140.3 171.4 207.6C171.4 232.7 177.5 256.3 188.4 277.1C167.4 278.9 146.4 285.3 126.9 296.6C69 330.2 42.1 396.8 56 459.1C57.9 467.5 67.4 471.1 74.9 466.7C79.9 463.8 82.5 458.1 82 452.3C81.7 449 81.6 445.7 81.6 442.2C81.6 318.7 266 318.7 266 442.2C266 530.6 171.5 555.8 117.8 517.6C113.3 514.4 107.3 513.7 102.5 516.5C95.5 520.6 93.9 530.1 99.8 535.6C146.4 579.4 217.8 589.5 275.9 555.8C293.8 545.4 308.7 531.9 320.4 516.4C332.1 532 347 545.5 364.9 555.8C423 589.5 494.4 579.4 541 535.6C546.9 530.1 545.3 520.5 538.3 516.5C533.5 513.7 527.5 514.4 523 517.6C469.3 555.8 374.8 530.6 374.8 442.2C374.8 318.7 559.2 318.7 559.2 442.2C559.2 445.6 559.1 449 558.8 452.3C558.3 458.1 560.9 463.8 565.9 466.7C573.3 471 582.9 467.5 584.8 459.1C598.7 396.9 571.8 330.2 513.9 296.6C494.4 285.3 473.5 278.9 452.4 277.1C463.3 256.3 469.4 232.7 469.4 207.6C469.4 140.3 425.2 83.3 364.3 64.5C356.4 62.1 348.8 68.3 348.8 76.6C348.8 82.5 352.8 87.6 358.3 89.8C441.7 123.4 429.1 268.2 320.5 268.2C211.9 268.2 199.1 123.4 282.5 89.8C288 87.6 292 82.5 292 76.6zM280.4 352C280.4 329.9 298.3 312 320.4 312C342.5 312 360.4 329.9 360.4 352C360.4 374.1 342.5 392 320.4 392C298.3 392 280.4 374.1 280.4 352zM467 381.7C450.8 381.7 435.6 387.2 424.9 396.7C414.8 405.8 406.8 420.1 406.8 442.3C406.8 463.4 414 477.3 423.3 486.4C455.5 461.8 478.8 425.9 487.2 384.6C480.9 382.7 474 381.6 467 381.6zM234 442.3C234 420 226 405.7 215.9 396.7C205.2 387.1 190 381.7 173.8 381.7C166.8 381.7 159.9 382.7 153.6 384.7C162 426 185.2 461.9 217.5 486.5C226.9 477.4 234 463.4 234 442.3zM275.2 218C284.2 228.2 298.4 236.2 320.4 236.2C342.4 236.2 356.6 228.2 365.6 218C372.3 210.4 377.1 200.5 379.2 189.6C360.9 182.8 341 179.1 320.4 179.1C299.8 179.1 279.9 182.8 261.6 189.6C263.8 200.5 268.5 210.4 275.2 218.1z'/%3E%3C/svg%3E`;

	return `
		shreddit-app .re-user-tag {
			margin-left: 4px;
		}
		[data-type="comment"] .tagline .re-user-tag {
			position: relative;
			top: 4px;
		}
		.re-user-tag,
		.re-tag-popover-preset-chip,
		.tag-preview {
			display: inline-flex;
			align-items: center;
			gap: 4px;
			height: 20px;
			width: fit-content;
			max-width: 150px;
			padding: 2px 6px;
			border: none;
			border-radius: 3px !important;
			color: var(--tag-fg);
			cursor: pointer;
			font-size: 13px;
			font-family: Verdana, sans-serif;
			font-weight: normal;
			position: relative;
		}
		.re-user-tag .icon,
		.re-tag-popover-preset-chip .icon,
		.tag-preview .icon {
			width: 18px;
			min-width: 18px;
			height: 18px;
			background-color: var(--tag-fg, #fff);
			mask-size: contain !important;
			mask-position: center !important;
			mask-repeat: no-repeat !important;
		}
		.re-user-tag span,
		.re-tag-popover-preset-chip span,
		.tag-preview span {
			display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			text-wrap: nowrap;
		}
		.re-user-tag .icon-tag,
		.re-tag-popover-preset-chip .icon-tag,
		.tag-preview .icon-tag {
			-webkit-mask: url("${iconTag}");
			mask: url("${iconTag}");
		}
		.re-user-tag .icon-star,
		.re-tag-popover-preset-chip .icon-star,
		.tag-preview .icon-star {
			-webkit-mask: url("${iconStar}");
			mask: url("${iconStar}");
		}
		.re-user-tag .icon-heart,
		.re-tag-popover-preset-chip .icon-heart,
		.tag-preview .icon-heart {
			-webkit-mask: url("${iconHeart}");
			mask: url("${iconHeart}");
		}
		.re-user-tag .icon-crown,
		.re-tag-popover-preset-chip .icon-crown,
		.tag-preview .icon-crown {
			-webkit-mask: url("${iconCrown}");
			mask: url("${iconCrown}");
		}
		.re-user-tag .icon-peace,
		.re-tag-popover-preset-chip .icon-peace,
		.tag-preview .icon-peace {
			-webkit-mask: url("${iconPeace}");
			mask: url("${iconPeace}");
		}
		.re-user-tag .icon-tick,
		.re-tag-popover-preset-chip .icon-tick,
		.tag-preview .icon-tick {
			-webkit-mask: url("${iconTick}");
			mask: url("${iconTick}");
		}
		.re-user-tag .icon-thumbs-up,
		.re-tag-popover-preset-chip .icon-thumbs-up,
		.tag-preview .icon-thumbs-up {
			-webkit-mask: url("${iconThumbsUp}");
			mask: url("${iconThumbsUp}");
		}
		.re-user-tag .icon-thumbs-down,
		.re-tag-popover-preset-chip .icon-thumbs-down,
		.tag-preview .icon-thumbs-down {
			-webkit-mask: url("${iconThumbsDown}");
			mask: url("${iconThumbsDown}");
		}
		.re-user-tag .icon-ban,
		.re-tag-popover-preset-chip .icon-ban,
		.tag-preview .icon-ban {
			-webkit-mask: url("${iconBan}");
			mask: url("${iconBan}");
		}
		.re-user-tag .icon-swear,
		.re-tag-popover-preset-chip .icon-swear,
		.tag-preview .icon-swear {
			-webkit-mask: url("${iconSwear}");
			mask: url("${iconSwear}");
		}
		.re-user-tag .icon-toxic,
		.re-tag-popover-preset-chip .icon-toxic,
		.tag-preview .icon-toxic {
			-webkit-mask: url("${iconToxic}");
			mask: url("${iconToxic}");
		}	
		.re-user-tag .icon-paw,
		.re-tag-popover-preset-chip .icon-paw,
		.tag-preview .icon-paw {
			-webkit-mask: url("${iconPaw}");
			mask: url("${iconPaw}");
		}
		.re-user-tag .icon-lemon,
		.re-tag-popover-preset-chip .icon-lemon,
		.tag-preview .icon-lemon {
			-webkit-mask: url("${iconLemon}");
			mask: url("${iconLemon}");
		}
		.re-user-tag .icon-rocket,
		.re-tag-popover-preset-chip .icon-rocket,
		.tag-preview .icon-rocket {
			-webkit-mask: url("${iconRocket}");
			mask: url("${iconRocket}");
		}
		.re-user-tag .icon-pawn,
		.re-tag-popover-preset-chip .icon-pawn,
		.tag-preview .icon-pawn {
			-webkit-mask: url("${iconPawn}");
			mask: url("${iconPawn}");
		}
		.re-user-tag .icon-game,
		.re-tag-popover-preset-chip .icon-game,
		.tag-preview .icon-game {
			-webkit-mask: url("${iconGame}");
			mask: url("${iconGame}");
		}
		.re-user-tag .icon-car,
		.re-tag-popover-preset-chip .icon-car,
		.tag-preview .icon-car {
			-webkit-mask: url("${iconCar}");
			mask: url("${iconCar}");
		}
		.re-user-tag .icon-user,
		.re-tag-popover-preset-chip .icon-user,
		.tag-preview .icon-user {
			-webkit-mask: url("${iconUser}");
			mask: url("${iconUser}");
		}
		.re-user-tag .icon-mod,
		.re-tag-popover-preset-chip .icon-mod,
		.tag-preview .icon-mod {
			-webkit-mask: url("${iconMod}");
			mask: url("${iconMod}");
		}

		.re-create-tag-btn {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 18px;
			height: 18px;
			vertical-align: middle;
			cursor: pointer;
			border: none;
			background: none;
			padding: 0;
			opacity: 0.4;
			transition: opacity 0.15s;
			-webkit-mask: url("${iconTag}");
			mask: url("${iconTag}");
			background-color: currentColor;
			mask-size: contain;
			-webkit-mask-size: contain;
			mask-position: center;
			-webkit-mask-position: center;
			mask-repeat: no-repeat;
			-webkit-mask-repeat: no-repeat;
			margin-left: 6px;
		}
		.re-create-tag-btn:hover {
			opacity: 0.8;
		}
		.re-title-username {
			display: block;
			margin-bottom: 0.5rem;
		}
		.re-tag-tabs {
			display: flex;
			gap: 4px;
			margin-bottom: 12px;
			padding-bottom: 4px;
			border-bottom: 1px solid var(--bg-tint-4);
		}
		.re-tag-tab {
			background: transparent;
			border: none;
			border-bottom: 2px solid transparent;
			border-radius: 0 !important;
			color: var(--text-grey);
			cursor: pointer;
			font-family: Verdana, sans-serif;
			font-size: 13px;
			padding: 6px 12px;
			margin-bottom: -1px;
			transition: color 0.15s, border-color 0.15s;
		}
		.re-tag-tab:hover {
			color: var(--text);
		}
		.re-tag-tab.active {
			color: var(--text);
			border-bottom-color: var(--accent);
			font-weight: bold;
		}
		.re-tab-pane {
			display: none;
		}
		.re-tab-pane.active {
			display: block;
		}
		.re-tag-details {
			display: flex;
			flex-direction: column;
			gap: 8px;
		}
		.re-tag-detail-row {
			display: flex;
			align-items: baseline;
			gap: 8px;
			font-size: 13px;
		}
		.re-tag-detail-label {
			font-weight: bold;
			color: var(--text-grey);
			min-width: 70px;
		}
		.re-tag-detail-value {
			color: #var(--text);
			word-break: break-all;
		}
		.re-tag-detail-value a {
			color: var(--accent);
			text-decoration: none;
		}
		.re-tag-detail-value a:hover {
			text-decoration: underline;
		}
		.re-edit-tag {
			display: flex;
			gap: 1rem;
			padding-bottom: 1rem;
			border-bottom: solid 1px var(--bg-tint-4);
		}
		.re-edit-tag > div {
			flex: 1;
		}
		.re-edit-tag > div:nth-child(1) {
			padding-right: 1rem;
  			border-right: solid 1px var(--bg-tint-4);
		}
		.re-tag-popover-preview {
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid var(--bg-tint-4);
			padding-bottom: 1rem;
		}
		.re-tag-popover-presets-list {
			display: flex;
			flex-wrap: wrap;
			gap: 6px;
			margin-bottom: 2rem;
		}
		.re-tag-popover-presets-list > span {
			font-size: 12px;
			opacity: 0.6;
			margin: 0 auto;
		}
		.re-tag-popover-preset-chip:hover {
			opacity: 0.85;
		}
		.color-picker {
			width: fit-content;
		}
		.cp_dialog {
			z-index: 100000 !important;
		}
		shreddit-post faceplate-hovercard > faceplate-tracker {
			display: flex;
			align-items: center
		}
		.entry .top-matter p.tagline {
			display: flex;
			align-items: center;
			gap: 4px;
		}
		.tagline .subreddit {
			margin: 0
		}
		.re-user-tag-tooltip {
			position: absolute;
			top: calc(100% + 8px);
			left: 50%;
			transform: translateX(-50%);
			background: var(--bg);
			border: 1px solid var(--bg-tint-4);
			border-radius: var(--border-radius);
			padding: 8px 12px;
			color: var(--text);
			font-family: Verdana, sans-serif;
			font-size: 13px;
			white-space: nowrap;
			z-index: 99999;
			pointer-events: none;
			box-shadow: 0 4px 14px rgba(0,0,0,0.5);
			display: none;
		}
		.re-user-tag:hover .re-user-tag-tooltip {
			display: block;
		}
		.re-user-tag-tooltip .re-tooltip-label {
			font-weight: bold;
			color: var(--text);
		}
		.re-user-tag-tooltip .re-tooltip-note {
			margin-top: 6px;
			color: var(--text-grey);
			font-size: 12px;
		}
		#pdp-credit-bar > span,
		#pdp-credit-bar > span > div,
		shreddit-comment > details > summary div,
		.thing .entry {
			overflow: unset !important;
		}
		[pagetype="profile_overview"] p[data-testid="profile-prefixed-name"] {
			display: flex;
			align-items: center;
		}
		shreddit-profile-comment [id^="poster-info"] {
			display: inline-flex;
			align-items: center;
			gap: 2px;
		}
		shreddit-comment span:has(faceplate-hovercard):has(.re-user-tag){
			display: flex;
		}
		shreddit-comment [source="post_detail"] mod-notes-opener {
			display: flex;
			align-items: center;
		}
		[id^="feed-post-credit-bar"] [source="post_credit_bar"] mod-notes-opener {
			display: flex
		}`;
}
