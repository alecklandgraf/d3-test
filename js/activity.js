(function(){

var icons = {
  "FaceTime": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACVElEQVQ4y6WTXUhTYRjHJ44VlFCG2HDqRlq6MBRpsHXhIBacviizkamkbutozkVXQTdGIaVWK2hJYXQz27AYw32wCzeJKdrGtutkwi7GrrvNQf+e53A02O0O/Hg/nv/zO+fA+yoAKKpBUbWAHhXRTPQRA8RgBQNyjTMqualW7uNRoRME4XM0Gv1dKBRQLBZRKpUkeM57XOMMZ+XGMxaLheUaFlzd2tr6k8lkkE6n8WnRA4dtDOJ9Oz5+eC/tcY0zlL1FGMxmc2BnZ4fXl1kgZrNZbG9vQ3TY0NTWjebe61DWt+NYoxZ227hU4wxln4mi+DOfz/8lAa8nWDCdy+Xw1v0KDS0dEKaXYBxawJG2azik6SOJDu43C+AMZb/s7u7y10hfRWsXC1xcHL57B+pzAjouudBy8Qnab7pR13kbhxu7MDI8tC/4xr8Ui8UkyYEglUphbPQeVCdOQ3nSAJ0wA8tDPy44fdCcH8AIyTlD2e8bGxsIh8NIJpP/BZubm3C/nodaq4dSbUSD8RGuzMYxupTCqR4zFl7OgjOU/cqNwWAQ6+vrBwJnIpHA6uoqnFMPoO3shbqnH2f7H6Or7wamJkSpIR6Pc8M7q9X6KxQKYW1tjdfTLBhaWVnZ8/l88Pv9mJ97gUnRAdE+jrnZ59KeXNuj7CQxZjAYspFIpMy9LDCYTKYfXq+3HAgEpLeF6Q3hcEia897y8nKZM5Q1Emo+D3q9fobGbhbUEwLxlPAQixV45JogZ/n4HieaiLr9c31UNrcS2gpa5RpnauW7UCP31VR9G/8Bl5rq0ZC41AUAAAAASUVORK5CYII=",
  "iTunes": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACgElEQVQ4T3WSX0hTYRjGvd7ErKFO0S68SrqJFCtYiWUhhAQaGRqFRphOMBwUhkQllYlRaAayVdqyYBfZSreFY7F/Hq1sRTpxIjTQ6YZ1Ud5MhafvORyNIb7wsPe87/N7ON+3k5S0tTKF8oVKhSoVseeMu20rWSi/ubm5XZIkbywWi6yursYp9pxxR4/iTSgOdFar9X1gev7PzWd+HK7rR/qxDlnsOeOOHnoVZrMKuHBIs2sljQNQHelCcmk/UsotSCl7JZ57oCpsR1FdH+hRQgo24CyDwdDBdMLqkl5oau3Iu2JDTbcPPfYg7IEwJmaXoDr0APTQS4YsAwq9Xq+Pr6gu6oam3oXMJgdCi78Qii4Lid/FZcxElpFaYZE99JIhy4CyaDS6yHMmnxxAVqsf2Vc/ILgQw9e5CJ6PfMeNPi8+zy4grdYqe+glQ5YBF3jTvKzU6iHk3BlHznUn/MGf0Jx4iPRzL6ApN2J4fAYZ+mHZQy8ZsgyoSQi4LSH7mgOubyHxJnbk3vUgv2UY9vFpZDRsCahhQMWSKPkI4ua19TbsN7yF9COEzIZBPHr3CWOTIYwKpV38fwQyZBmgc7vdY7wY1YH7uGf2wD0xCU9gCtrLb2AcGoVb9J0vXdhZbd28RDJkGbBbr9c/DgTn/x4834ve106MSAG0GR3QNtqgrXiKvLNGpBQ/gVpI/huFlwxZBrCKzWbzR4tzen3P8VvI1bVCta8NOyoHZamPmuSPi7BNmlunl8wGzEoVOm00mXyuL6GVps4R6C71bfmUJybDKybhoVdhEmqX0KmqqiqL+FSnwuHw73g8vkax54w7ehTvtrVX6IxQi1CXIvaccZdQ/wA4MdWW2+WadgAAAABJRU5ErkJggg==",
  "Keynote": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACcElEQVQ4y42SbUhTYRTH7VOFvZmgbmgsnWNeZ21OFjnd3Yx2J5aYmoOmzTJfyjSqL2JsC5T8kJlrJZVhs7ayUX0xyRe0DcWCshdBMDMWFVdICOfQggb/7p0ozRHzwI/nec45z4/z4YQBCFvmlmNg693Hr1pv2ga9hCAW/9b+R8Cjo2vEbrnT09/UbJWu5XOAYF9U+K4Wi8NXIEr8QUWH05qYTTTFwJ7ZXObO5hiomM2T+6M2HgoS5CZwb5sarsOczoFpdwRM4oilU7KEkXlbZJEoF0T8zOFuswYLeFGuG2q+r0sTCzPJwdvxzxj74Ma7CTfG3k+jlYyGXc2FITXam7sjsjdIUMTnfhw6JoCzgsAjvcgv6H4+jJ6+Yb+gsyAefToB2tW8X/nxnNcBgmz+9i3n0uNnpxrTMHlJhhemDMzNL2LOs+DH41lEb40E43VpcJal+IqEcZ8CBIXCneqr+cS884IEToMEtpOEn/uVBO4xE1nLk2AtE2HovAT91Sk4JUuc1YriElYEZdIkR9ORdFzWyWGrlWOkMRPTbZmY6cjEt3YS4y0ZGDRmwFYtRwvbp92LEzLhgxVBsZgw6VOT6aPSZPq4VESX+iHoEpkY+j0S6Jl8qR8RrWdg+4pTicqgRVqNTJWHCuMA1ryJLHw+f71CSZ3JUue9ITXFqG0YAJl1eIJUUfU8pXJDSAFJah6WVBnQPfoFOYWnYbgyhAMHq3C2xgyFirKHFiip33UXLZj+6oFWX4/mNheePBvFUwaSpLxrmeAaqdJgYuo7lsM9swA2x9ZCCphYp1CqtQqScilUGg8z0R/m40smp2Nrq/v/AsP+bXBwOZwoAAAAAElFTkSuQmCC",
  "TextMate": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADGklEQVQ4T12Ta0hTcRjGR1Zgmd3I+qZhiJBKpoE5GWXBQgmyy2iVNstMM03Mpbny2nJqObecUc4u6lqma22eIxVepqKbzvtlJSaZxfJLF5Dog8LTu2gxfOEHB87z/Pj/z8vhAOC4QrOir6/P32azxc3NfX408/6jdahtDEOtY2BZNpLeuy3Lc9wGBwe5s7Nz8vn5+bYh06hdJ2dwJ74KKSHZiF51CtGrTyH7YCFMJtMzynsuF3gNt08ghy9FzHoRjnjEIcbzLASbz0O49QIEm+JxdG0sjnnEYmJ48ivlfZYLQkbax3HSKwEinxSIvC/hSc4zPJVokRd1G0+ua5DkfwVCkpv1feBF8CKXlpZOU/m4UxDR8bbjm2BdHBJ3pCJnfz6MFSz0pUY0FDahkq5y+0gpRJvP4UFyNeR3lDq73f4pcKeft1MQrNVqbelBmag8fx+tNe3o0nSjnxlAS/UbWHQWaLI1qM2qQwHJWeb1r57uTmzf7iNxCnZIpVJGeUaJy35pYJQtMDeaoUqsgjggA81KBq/lLBRnFUgJSsbU1DRCQwK+zMzMbHQKtgkEgjKDTI/cMAka6O6WF714RceX7StAj6YLLSUG1Fx8gMqCe+juagOXG17D+bdOx3gQJ22dEyg7XAx1uhrGWzqMMkOwtY7D2mBGg7gWyrRKTE6+Q0FqHhiG1XH+rdMxbkRkb6/5u8Q3DYWhWahJfYj6pOq/RW2yGhUnylCWI0NPTy/KuTcwPjD2f53OXQbX1WlsVdEylARnoTpWCVW8Arf2ZKEqWYXCvddgtQ7gwr443N2ZiXH6wNTZ7Srwzci42mgQ16F8VzZUEXlQhedCHngN5QFilKRI0dSkx6vcekywAzC8MNipE+Yq2MLj8W5a1G1QBIrxMCIfz4VKdBTrYWk0ob/fioSEi7/5fP40Zd8QEsLPVeBOxHwYnlq0tQyCedm8WFRU9IPPPzQtFJ6eNRqbl9zd18goIyIOOMrEWlfBCmI3cZdgicdEvqMwMjL6k8+PUtCzD7GBWOnoOHH9KdYTQQSX2OUsLCwsRLoWlvMHu3AwtUkZ68MAAAAASUVORK5CYII=",
  "Terminal": "data:image/png;base64,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",
  "Xcode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC4UlEQVQ4T6WTT2gcdRTHP7+Z2dnZ2U3S3Sa7G02L1HZTi1FaqWtpLYoHT7ZeFKyI4NVTjQY8qOhFKnpRxIOIl+LBelGh4EVUDBJtlWibmiZNbDaum2R3sv9mZ2d2dp6HtFJKbn7ge3mHLzze+ygR4f9g3D64Fdu2iw8Wj3w4XiiMJ5OpaGbm5z8vXvzlM9/3PhKRAAAR2TbjJ14Y0GPWTMwemsmMFWYnX54KHceRpeslOXrseAM4BGQUkDj4/JlTO4ZzBTNhF3RrcI+VzIz6khxAi8d6GHp6UMNrlnjviTs5/dIUv87O8fZbrzL1yuR5Bex/9I3vfzswcZ+VsmP0IgPd0Nj0FPfmNCptKLcF8/JZ7jaqnFvMkz98nG9fe+xKd2PhdQ2oR33fyaWTdJRNT4ux6RvoQC4FjxcgYTQ5dWwvn5z9kuKJk+QGB9j77AfTIvKFBri19UpVVxG6CESKThiRtRUpU/HNXEB2/TvcdpP8oSexbQNDV6Ti1lEADfBdp7LmdQNCUWj0GbVgzwi0u31cz+HTN0/z9DPPsev+h0nTw9QMYqq3G7bO2HNr5X+cdkhmR8TujI4uwpAF1zZCVqY/Z2QkTRQf4/DEHSw0LXQVEIoWA9BERDr18orT6uIFwtJGHz+Chtdn/u81fv/6Y2pVh/Q9j5Ad0pEoxOkKVtySmysQ1sulsBegKyHsCzsTMLfqMv/TeXaNDrNebZLdd5BrXo7imE7OVlRaEUopSwPouvW/PLcdrrkR+UENt+Oz3DK4dO4MrtsilTvA2MRDrFZD/igFeF6frG2awPDWK7v1itfxfYK+0W4LV+tCfGOWu3IpFheXyRdfJPDq0fJCqVspXa/V18uL1ZXlWaBxo2B1c3P1qjOSMIwflyAKu90f3j05cOSB/VqjcbnemL7w1PyFS/M4UU3kqw7/8f6WC4AN7AN2AnFAN03zHdM0W8Dk7Z7cGnWjYFuUUikgkJvmbcO/lQx0AtIOR1YAAAAASUVORK5CYII=",
  "Adium": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACIklEQVQ4y5XRTUjTARgG8Gd/mV8z11gz81LR5pjWXCsjbGutrfzYRn4wpJHNkaXDUvowU5tEVAeJBXooyUtaEs2vmZAEWgyJOkSXGuIhOgQRUbLUi2w9XQy67G895+f9wcsDJM9WwYZQbpPwFoAW/5ksqQMzrW807HpXxLQqzAHI/JfDVAD7UqoROfE8l/UTGtZP7ODx6RziEEIAjACkYoBa5sWiJ7yZMf7gn3xPfKZreCOVfmEFgEEMqNV1pidaJ3dzJU76fG30+dq4FCcbR3ZS35lFAD4xoEjuEZYrBvO48GuZjz++Z+jTAj+sfqX9vorqNhkBnBQDVNkuLHofaOga0rF9zMjAeDErBvPpGcin+ox0FYBZDBAA1EX8shXOlpHRdjJ6hZwpZ7RjUzxVQPdaRzTKhlJ8+RnQc/6qlfMBO5cCBrY4EAOwZf0ZLZisDBtZdUPLgz0FtNwuZOV1LY8O6wgTRtebsdLSJ2fjWClrHu7huVkbL7wqp/epiadH7DwQ3EAAzuTn23Dn2ICa1X0Gng2b2RFxsGvOxfPTh+m+a6Tz3nYiDz3JgVzc0l9UsLa/iE2jJfSPm9kctrBlykrv4F4WdysJBa6JvdAgL0tPND/bz+YpE9tfHmHgtZOXXth4OWKlyp1JqOAVA/QAerNtwreSmwq6H2noeVJAW1DFnJqUGIB+ALvWWyIDQCGAOkmaJChJlfQCOLWGZwCQ/F3+DRhl7XLFAnMRAAAAAElFTkSuQmCC",
  "VMware Fusion": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABaklEQVQ4y2NgENPiAeJpQPwIiD/hwI+gangYMICY1mxpv/ofdjPe/nec9w0rBsmB1IDUYjPguWHzxf8KGWv/y6Ysx4pBciA1ILXYDPgkn74arJABC+DUD7QCyYHUgL2DzQCYTQw4AEyeVVTjXw4DwycgfgTE04CYB6cBxczMjJ8zMu7+r6j4j45/Z2f/X6Ol9QNowBy8LuhjZNR8wcTyAijxHwVzcPz/4+DwH2jAC6wGfGJhuVPEyqUBYqsoWWqKuxa+kPAoA8uvZ2CwARvCxgYy4BOKAaAAAykCKXjOxPJcRlIPbAinpruWZNSMezALYC6BGfBSJnEh1uiTjp39nFXFQQPda+gGzOExi/khk4DdEKnoGfcZJXQZ8RkASsozwYkE6B1QVB1kY/8PwriiFdUANAAShClYzsBgSY4BL/+gRxsW/AdiwEtsBsxZy8Dw4w8BzSA1kISEaQAPEM8E4ufQZIsNP4eq4QEAsu4zHVhSLwcAAAAASUVORK5CYII=",
  "All Programs": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABxklEQVQ4y+2Sz2pTQRTGf2fuTW7qH6hIit4Itrp1Y9uNgi6UuLGgLuzClWv7IkJd+QDq3jew0OLGIkgfwFWhosVqQojmtrlzznFxk2hoH8GBD+YwZ35838yB/0vGm1ev39w8f3H+bdbI8iABCYJIdXx6JqOR1XF3hsPh1297u48fPXzwASAdA/I8bz/f+JIPYjK6DCIV5Na1FrNnGpg5qWh+Z/5SG5gGBBEKMw4l4O64gZpRSwI/fx9x0C9QNeqi3F2Ym0RI/83TOSr5FZUYFVVDo9I82+Dz3gFuhrnTSAy35nGA4+x3+gxKwVVxM9yMmaDsHhbgDu40gmJmJwDcOer1UQuTZnA6P4ZTdSaKmh4HmDlPblwmWvVwAogAXrlzc9yNVBzTExwURdF9enuBEAIhCQT5+42VAcOsUqfb7R4D1Gr11TKWBBFiEalnGQLEGAkhoKo4kCQJiKwCLyeDtL7+on1/ZeWdSJhY29n5hMZImqZcX1yemj53Y2tz897a2rONFODj9vaVpaXlwey52VPjplbeoowRAYpiMAXo9XqD91tbV4ENAbjQnEvTWi1NkpCOYiWVxpbcAB0pmlosyzLuH3yPfwDhOOaPPU9BWgAAAABJRU5ErkJggg==",
  "Google Chrome": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACmklEQVQ4y6XTTUjTARzG8X+JNaxQs2WJIVgu7U3/5t7btBVuc3rIDmaR0csOQafMIvBSBkKXCmmEUKAVUmYvlLZoSyVGZr5taos0l00HNpEiioJt326+kBjR4bn8Dp/Dj+cRAOF/8sdhaKdcHLboHCP7jIweLMB3wMyHPQbe71Y4vJoscUHAu1Vm8yozGd6lJFhiZnK/hWBJAZ+LjQzpshnMzKA/bb1tXiAQtdr2NiWFMbWccb2KcYOGQJ6KgF5JQKtiTK7Av02kT5pM79Ik2xwgp0krWq0yJtak4U/fxKhMhn9dElNlpQT3GvHpE/HpUhnRyfBp0+hNlzJQGitOA+oGjTOrWc+Tzal8SkhmItcAkTAdU9D5BSDCVFcOQdcyvrpjCXYKBN8IzmlAc0uNqd3CgdMig0I0AMW1Xo7WebHWv+PknVEgAh6B8EA04X4JwXaBaUB7U03hczN5L/KpO1RE81AIfdUrSmq6KanpIa+qg8ZuYDSPkHsxIY+EYNssQH1DRdEzM6bn+ZQ3HeNx3w9kp16gPe9ix3kXsopW6jtCc4AJ5yxAeU1Jod2MxW5E36wCQHrkLiutjSRYG4k7+gAA+gRCniWEPBLGWqJmgJxLCqfutpZCuxlji4HjrsMANDj83HKO8T0E3wa3EnELhPslTLYtwnc/ZuaJWRe2i4orCgofm7DYTRhbDOQ+UVHZW8GJl2e40CCFAYGQZym/elbw8b4Eb32cOKdIW85l2+RXFFgemrC0mCmwGzE8zaf4ngY8UeCO4WdnPCNNMbivr7LNW+X0StEmVuegvabG1GRCeddCf2sy4Y4E/I+WM1gXT9fVRNuCY1pfniluPJvl2FCZTVl1Br7aeLpqVvP6cqLDdXGt+Nc1/mt+A5t8oJ7W5c/CAAAAAElFTkSuQmCC",
  "Acorn": "data:image/png;base64,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",
  "Skype": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABPElEQVQ4y5XTTUrDQBgG4BwlF4gncJG93qCewBxBT6BFxx+ktqJuRIouguDCjYg/FEEFBWlBsdRaa5JiSlW0ILzOTJLpzMRF8sID4ZsvH5MZYhgsGyGhICFG5lR6hEIGLmWnB5QD5KTtbt3DfyaOB3CuPjnr4F1fl4aUulBsvqEx+IWeradvaL3x56x1CIVE4azPX3AuP6Ja5RXF+hevmVUPUu/2aBerz0gUTkPefBEMMX7Yg7ym6Y8GrLQglNs494fK9qNhPpQ+RmS5CZ2528F0LVSGWftdtU9k6REJc6cNp0ZPvdQUtdmb+FxYXeodDSAPLgVm6iSItu3/YGzvhWPPLJNHHpK+WHydiw2bQmLmOkxdI6vJPYLIQp1QkFnVFqfXFUqK94RCLqnM39mUSyGDHH/t3C2hIOEv/wFdGR2Mt6luoQAAAABJRU5ErkJggg==",
  "iPhone Simulator": "data:image/png;base64,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",
  "HipChat": "data:image/png;base64,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",
  "Activity Monitor": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACSklEQVQ4EQXBsWtdVRwA4O+ce959sa2x1rbWUkFUFBRBcRBcJCg46NJZOgou4ihCN0cHIVR09h9xsIoUnVwclCpt0xCbmLz05fXde8/5+X0pIgAAAAAAAABAun79ekDf90gkEgAAACIgDMMIytbWuwBaa0qZ6bqMJCUggohAaK2ptQIot2//A77+blts9Dxai9WgPHNWO1waHzVpcyaWa4Lok7aafPbJpyADTK1qdVCjebBzzwsfvO+Jl1602N9Tx0ltzRjVNDRVAMi1NbU1NULNnZYY15PNZy/pz58zDZNUei1T5r08mxmmCYFQxnENYrXSIkyLlXTy0P2jAw/rQ/NHg+XdXcPRUpwqplzUYWVYDyDX2tTaSEksVjZObdi8cNHh33csdvbdWy5c/viqM1uvW+3+p/Sd/vEzhnE0jKMyTiOIS0/ZOHfW5ffeVqO5e39Hfe6CK9c+dPDHX8r5J73y7edeff5lt7753jRMoIzDCNrBwvHx0q9f3jAcHnt66y2vXbvqxy++Uvf2RS4Obv6mvvmGk6NjU6ug1FrBydFC6mdyKR7bPO3o1u/+7Ht1d9/8yiVtuZRPRrd/viUa8U6AUmsFcmZGmYqUO6lkd374xfziOVIVOauJTlbbhAAlagNaaFOTatOiSbnoz5wWU6UUURutqX3HNIkIkLa3bwRAyllCRKi1GsdJaEqZmZUidxlMUwVQfrp5E/TzXkqdnIHWmogGUspy6WQZISKcrE5A2fv3wUcwn/eRIQPQWgM5Z7pOB6iV9bTO8D/sm0js2knp+gAAAABJRU5ErkJggg==",
  "Finder": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC3ElEQVQ4y32TTWhUVxiG33POvXNnxmgwek0pgcaR6JjUZFHxp0FpB0RaRSTtiCAIQXAlA+7qLhRc6K4bF+1OECHjRlRoQSixgYBpFkWjC6OIE/I/48xc79xz7/n5XJiIEesHZ/NxeM57XngYEQEAyuWywGfG9/3M2NhYq7e3l63tisWiARH97xkZGeFEhK+6uoZ83y8REUZHR8WHdxgRoVQqedLLHerO7XCVlKRXX8hkslR59sR9OnlnZGe+/9qRH469TDvwHEegVqslYdh84ABANrulc/vXg7f37R3IhlFEbiqLJA6RbWvH3cUZ9uvlK+bwoYN/1BqSS6ls24Y2/nBysvFw4v5uZ+0/M8sw7QuM6nVpZqbK6Bs8jaX/pln4ep6+2X+Q3/trgmIZ6e8LBRgC5yJjAeA94NF0lVssszhY4VN/P0Cq8wT+vX8LPx/pZ9UAeDT9nDXqKyw/UEASJ5hfknwdIGiGeF0L4QoXe4/+gih4A2q9Qm//WczNhRg8fBzELJardXhuGqF81xRfA2hjIJMYUsawzMPiYgVdnRvR05OD53lggoNIQCkDZSy0tliXwGgDrS2EsNAqQSIbWHzxFNd+uwomUigcPQ0uHAAOlCZo81ECsgSdxIhaASxS2PrFLmwbuIDxZxvwz/g4Ojp8pDOb0AzqiGOJROn1CRJlIKXEq6nfkU5n0b6tB5v9HDLpNOA5+PPuTUw/noRWCmfOXYJO1EcA2TSxUrZzz7BJ6jNo1l+iUa2wKKxSm63wlZV56ttzgLpzfdBxwqIoMN4aQDuKgXuuJc4ZBNv05bfY0l2A4BxvmgvMXbhuT/x0ngdBwFqtkCwTTKQyjmoq5gCACcPG7MTVy/JFl2eNsuD0ThgCYxAxksrJSxeHJpxUdikOIzfluXx2brZ15tSPwWdlAopi1dYSgOFPyfS+A8aYAIrrHf5umQFAPp+/4bquv6o1AyDK5TKKxaJ5C1ETnk2Vrrm6AAAAAElFTkSuQmCC"
}

function init() {
    var svg = d3.select("#activity").append("svg")
        .attr("width", 960)
        .attr("height", 520)
      .append("g")
        .attr("transform", "translate(0, 0)");
    return svg;
}

function timeInterval(d) {
  var txt = '', days = parseInt(d / 86400), hours, minutes, seconds;
  d %= 86400;
  hours = parseInt(d / 3600);
  d %= 3600;
  minutes = parseInt(d / 60);
  seconds = d % 60;
  function fmt(prefix, n, suffix) {
    if (n === 0) {
      return prefix
    }
    return (prefix ? prefix + ' ' : prefix) + parseInt(n) + suffix
  }
  txt = fmt(txt, days, 'd')
  txt = fmt(txt, hours, 'h')
  txt = fmt(txt, minutes, 'm')
  return fmt(txt, seconds, 's')
}

function round6(d, end) {
  var block = (d.getUTCHours() * 10) + (d.getUTCMinutes() / 6);
  if (end == true && block == 0) {
    return 240
  }
  return block
}


d3.csv("data/activity_log.csv", function(data) {
  var margin = {top: 10, right: 7, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 520 - margin.top - margin.bottom;

  var y = d3.scale.linear()
      .range([height, 0])
      .domain([0, 240])

  var durationY = d3.scale.linear()
      .range([0, height])
      .domain([0, 86400])

  var x = d3.time.scale()
      .range([0, width])
      .domain([new Date(2012,0,1), new Date(2012, 11, 31)]).nice()
  var dayFormat = d3.time.format('%y%m%d')
  
  var durationMap = {}
  data.forEach(function(d){
    d.duration = +d.duration;
    d.start_ts = +d.start_ts;
    d.end_ts = +d.end_ts;
    var start_dt = new Date(d.start_ts * 1000);
    var end_dt = new Date(d.end_ts * 1000);
    d.day = dayFormat(start_dt);
    var end = round6(end_dt, true);
    d.height = height - y(end - round6(start_dt));
    d.durationBlock = d.end_ts - d.start_ts; // in seconds
    d.durationHeight = durationY(d.durationBlock);
    durationMap[d.program] = (durationMap[d.program] || 0) + d.duration;
    d.y = y(end);
    d.x = x(d3.time.day(start_dt))
  })

  var nestByProgram = d3.nest()
    .key(function(d) { return d.program; })
    .map(data);

  var programs = d3.keys(nestByProgram)
    .sort(function(a, b){var aa=durationMap[a], bb= durationMap[b]; if (aa < bb) {return 1;} return -1})
  
  d3.select("#computer-activity-programs")
    .selectAll("a")
    .data(programs)
    .enter().append("a")
    .attr("class", function(d, i){return "btn btn-small" + (i == 0 ? ' active' : '')})
    .on("click", function(d, i) {
      d3.select("#computer-activity-programs").selectAll("a").classed("active", function(dd, ii){
        return i == ii;
      })
      update(nestByProgram[d]);
    })
    .append("img")
    .attr("width", 16)
    .attr("height", 16)
    .attr("src", function(d) {return icons[d]})
    .attr("alt", function(d) {return d;})
    .attr("title", function(d) {return d + " - " + timeInterval(durationMap[d]);})
   
   var mode = 0;
   d3.select("#computer-activity-mode")
    .selectAll("a")
    .data(["Time of Day", "Duration"])
    .enter().append("a")
    .attr("class", function(d, i){return "btn btn-small" + (i == 0 ? ' active' : '')})
    .text(function(d){return d;})
    .on("click", function(d, i) {
        mode = i;
        d3.select("#computer-activity-mode").selectAll("a").classed("active", function(dd, ii){
          return i == ii;
        })
        updateAxis();
        update(lastData, true);
    });

  var svg = init()
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickFormat(d3.time.format.utc("%B"))

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

  svg.selectAll(".x.axis text")
      .style("text-anchor", "middle")
      .attr("x", 36)
      .attr("y", 7)

  var bands = svg.append("g")
    .attr("class", "bands")
    
    bands.selectAll(".band")
      .data(d3.range(24))
        .enter().append("rect")
        .attr("class", function(d, i){return i % 2 == 0 ? "band band-even" : "band band-odd";})
        .attr("x", 0 - margin.left)
        .attr("width", width + margin.left)
        .attr("y", function(d){return y(d * 10) - (height / 24);})
        .attr("height", height/24);

    var number_format = d3.format('d');
function hrTickFormatter(hr){
  if (hr == 24 || hr == 0 ) {
    return "12a"
  }
  if (hr < 12 ) {
    return hr + "a"
  }
  if (hr === 12) {
    return hr + "p"
  }
  return (hr % 12) + "p"
}

    function updateAxis() {
      var b = bands.selectAll("text")
        .data(d3.range(24));
        b.transition()
        .text(function(d){
          if (mode == 1) {
            return number_format(d+1) + 'hr';
          }
          return hrTickFormatter(d);
        })

        b.enter().append("text")
        .attr("x", -12)
        .attr("y", function(d){return y(d * 10) - ((height / 24) / 2)})
        .attr("dy", ".5em")
        .style("text-anchor", "end")
        .transition()
        .text(function(d){
          if (mode == 1) {
            return number_format(d) + 'hr';
          }
          return hrTickFormatter(d);
        })
        b.exit()
        .remove()
    }
    updateAxis();
    
    
    var datasvg = svg.append("g")
    var rect = datasvg.selectAll("rect")
    
    var lastData;
    function update(datum, modeTransition) {
      lastData = datum;
      rect = datasvg.selectAll("rect");
      var durationOffset = {}
      var a = rect.data(datum);
      
      function yCalc(d) {
          if (mode == 1) {
            var y = durationOffset[d.day] || 0
            durationOffset[d.day] = y + d.durationHeight
            return height - durationOffset[d.day];
          }
          return d.y;
      }
      
      // update
      a
      .transition()
        .delay(10)
        .duration(900)
        .attr("x", function(d) { return d.x;})
      .transition()
        .delay(modeTransition === undefined ? 900 : 0)
        .duration(900)
        .attr("y", yCalc)
        .attr("height", function(d){ return mode == 1 ? d.durationHeight : d.height })

      a.enter().append("rect")
        .attr("class", function(d, i){return "activity";})
        .attr("width", 2.5)
        .style("fill", "#2CA02C")
        .attr("x", function(d) { return d.x;})
      .transition()
        .delay(modeTransition === undefined ? 900 : 0)
        .duration(900)
        .attr("y", yCalc)
        .attr("height", function(d){ return mode == 1 ? d.durationHeight : d.height })

      a.exit()
        .transition()
          .delay(10)
          .duration(900)
          .attr("x",function(d) { return width + d.x})
          .attr("height",0)
        .remove();
    }
    update(nestByProgram["All Programs"]);

  
});

})()



