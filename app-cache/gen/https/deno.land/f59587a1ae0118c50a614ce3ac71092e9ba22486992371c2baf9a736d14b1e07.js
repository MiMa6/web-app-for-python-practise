// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
import { getOptionValue } from "../_options.ts";
import { emitWarning } from "../process.ts";
import { AI_ADDRCONFIG, AI_ALL, AI_V4MAPPED } from "../internal_binding/cares_wrap.ts";
import { ERR_INVALID_ARG_VALUE } from "../internal/errors.ts";
export function validateHints(hints) {
  if ((hints & ~(AI_ADDRCONFIG | AI_ALL | AI_V4MAPPED)) !== 0) {
    throw new ERR_INVALID_ARG_VALUE("hints", hints, "is invalid");
  }
}
let invalidHostnameWarningEmitted = false;
export function emitInvalidHostnameWarning(hostname) {
  if (invalidHostnameWarningEmitted) {
    return;
  }
  invalidHostnameWarningEmitted = true;
  emitWarning(`The provided hostname "${hostname}" is not a valid ` + "hostname, and is supported in the dns module solely for compatibility.", "DeprecationWarning", "DEP0118");
}
const dnsOrder = getOptionValue("--dns-result-order") || "ipv4first";
export function getDefaultVerbatim() {
  switch(dnsOrder){
    case "verbatim":
      {
        return true;
      }
    case "ipv4first":
      {
        return false;
      }
    default:
      {
        return false;
      }
  }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjEzMi4wL25vZGUvX2Rucy9fdXRpbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cbi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgeyBnZXRPcHRpb25WYWx1ZSB9IGZyb20gXCIuLi9fb3B0aW9ucy50c1wiO1xuaW1wb3J0IHsgZW1pdFdhcm5pbmcgfSBmcm9tIFwiLi4vcHJvY2Vzcy50c1wiO1xuaW1wb3J0IHtcbiAgQUlfQUREUkNPTkZJRyxcbiAgQUlfQUxMLFxuICBBSV9WNE1BUFBFRCxcbn0gZnJvbSBcIi4uL2ludGVybmFsX2JpbmRpbmcvY2FyZXNfd3JhcC50c1wiO1xuaW1wb3J0IHsgRVJSX0lOVkFMSURfQVJHX1ZBTFVFIH0gZnJvbSBcIi4uL2ludGVybmFsL2Vycm9ycy50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVIaW50cyhoaW50czogbnVtYmVyKSB7XG4gIGlmICgoaGludHMgJiB+KEFJX0FERFJDT05GSUcgfCBBSV9BTEwgfCBBSV9WNE1BUFBFRCkpICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVSUl9JTlZBTElEX0FSR19WQUxVRShcImhpbnRzXCIsIGhpbnRzLCBcImlzIGludmFsaWRcIik7XG4gIH1cbn1cblxubGV0IGludmFsaWRIb3N0bmFtZVdhcm5pbmdFbWl0dGVkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0SW52YWxpZEhvc3RuYW1lV2FybmluZyhob3N0bmFtZTogc3RyaW5nKSB7XG4gIGlmIChpbnZhbGlkSG9zdG5hbWVXYXJuaW5nRW1pdHRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGludmFsaWRIb3N0bmFtZVdhcm5pbmdFbWl0dGVkID0gdHJ1ZTtcblxuICBlbWl0V2FybmluZyhcbiAgICBgVGhlIHByb3ZpZGVkIGhvc3RuYW1lIFwiJHtob3N0bmFtZX1cIiBpcyBub3QgYSB2YWxpZCBgICtcbiAgICAgIFwiaG9zdG5hbWUsIGFuZCBpcyBzdXBwb3J0ZWQgaW4gdGhlIGRucyBtb2R1bGUgc29sZWx5IGZvciBjb21wYXRpYmlsaXR5LlwiLFxuICAgIFwiRGVwcmVjYXRpb25XYXJuaW5nXCIsXG4gICAgXCJERVAwMTE4XCIsXG4gICk7XG59XG5cbmNvbnN0IGRuc09yZGVyID0gZ2V0T3B0aW9uVmFsdWUoXCItLWRucy1yZXN1bHQtb3JkZXJcIikgfHwgXCJpcHY0Zmlyc3RcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRWZXJiYXRpbSgpIHtcbiAgc3dpdGNoIChkbnNPcmRlcikge1xuICAgIGNhc2UgXCJ2ZXJiYXRpbVwiOiB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2FzZSBcImlwdjRmaXJzdFwiOiB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwRUFBMEU7QUFDMUUsc0RBQXNEO0FBQ3RELEVBQUU7QUFDRiwwRUFBMEU7QUFDMUUsZ0VBQWdFO0FBQ2hFLHNFQUFzRTtBQUN0RSxzRUFBc0U7QUFDdEUsNEVBQTRFO0FBQzVFLHFFQUFxRTtBQUNyRSx3QkFBd0I7QUFDeEIsRUFBRTtBQUNGLDBFQUEwRTtBQUMxRSx5REFBeUQ7QUFDekQsRUFBRTtBQUNGLDBFQUEwRTtBQUMxRSw2REFBNkQ7QUFDN0QsNEVBQTRFO0FBQzVFLDJFQUEyRTtBQUMzRSx3RUFBd0U7QUFDeEUsNEVBQTRFO0FBQzVFLHlDQUF5QztBQUV6QyxTQUFTLGNBQWMsUUFBUSxpQkFBaUI7QUFDaEQsU0FBUyxXQUFXLFFBQVEsZ0JBQWdCO0FBQzVDLFNBQ0UsYUFBYSxFQUNiLE1BQU0sRUFDTixXQUFXLFFBQ04sb0NBQW9DO0FBQzNDLFNBQVMscUJBQXFCLFFBQVEsd0JBQXdCO0FBRTlELE9BQU8sU0FBUyxjQUFjLEtBQWE7RUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGdCQUFnQixTQUFTLFdBQVcsQ0FBQyxNQUFNLEdBQUc7SUFDM0QsTUFBTSxJQUFJLHNCQUFzQixTQUFTLE9BQU87RUFDbEQ7QUFDRjtBQUVBLElBQUksZ0NBQWdDO0FBRXBDLE9BQU8sU0FBUywyQkFBMkIsUUFBZ0I7RUFDekQsSUFBSSwrQkFBK0I7SUFDakM7RUFDRjtFQUVBLGdDQUFnQztFQUVoQyxZQUNFLENBQUMsdUJBQXVCLEVBQUUsU0FBUyxpQkFBaUIsQ0FBQyxHQUNuRCwwRUFDRixzQkFDQTtBQUVKO0FBRUEsTUFBTSxXQUFXLGVBQWUseUJBQXlCO0FBRXpELE9BQU8sU0FBUztFQUNkLE9BQVE7SUFDTixLQUFLO01BQVk7UUFDZixPQUFPO01BQ1Q7SUFDQSxLQUFLO01BQWE7UUFDaEIsT0FBTztNQUNUO0lBQ0E7TUFBUztRQUNQLE9BQU87TUFDVDtFQUNGO0FBQ0YifQ==