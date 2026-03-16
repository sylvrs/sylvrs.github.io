---
title: "Migrating Honey to Zig 0.15"
excerpt: "My personal journey through attempting to update the Honey codebase to comply and leverage the new features of Zig 0.15."
date: 2025-12-28
tags: ["Zig", "Honey"]
category: "Programming"
featured: true 
published: true
---

# Overview

One of my favorite things about Zig is its bold design decisions. While I might not always agree with them, the opinionated nature _usually_
brings some amount of performance enhancements or better exposure to the actual underworkings of Zig (a key tenet of the language's approach).

As such, each pre-1.0 iteration comes with a lot of changes to consider. As such, I want to document several of the changes that I've made to make sure
we are writing correct and performant code.


# The Big Things

## 1. `std.ArrayList`

## Logging

### The Problem

One of the nice features about Honey is its ability to be used as both a web language and a regular scripting language. As such, we have builtin functions
that allow for console logging (e.g., `@alert` which triggers the equivalent JS `alert()` call).

The actual communication tends to be a bit redundant since we have so many log types (`log`, `warn`, `error`, `alert`, etc.) each with their own externed function.
To eliminate this redundancy, we use the following generic writer:

```zig
pub fn JsWriter(comptime log_func: *const fn (msg: [*]const u8, len: usize) callconv(.C) void) type {
    return struct {
        const Self = @This();

        /// Writes a message to the log.
        pub fn write(self: *const Self, msg: []const u8) anyerror!usize {
            _ = self;
            log_func(msg.ptr, msg.len);
            return msg.len;
        }

        /// Returns a writer that can be used for logging.
        pub fn any(self: *const Self) std.io.AnyWriter {
            return std.io.AnyWriter{
                .context = self,
                .writeFn = struct {
                    pub fn write(context: *const anyopaque, bytes: []const u8) !usize {
                        var writer: *const Self = @ptrCast(@alignCast(context));
                        return try writer.write(bytes);
                    }
                }.write,
            };
        }
    };
}
```
Necessarily, this is overly complex. We _could_ have just created a concrete `JSWriter` type that accepted a function pointer but it was nice to be able to create concrete types for our specific cases.
This _did_ mean that we couldn't pass any writer that we wanted across different function signatures but that wasn't/hadn't become necessary at that point. It did create these nice types that we could easily use:
```zig
pub const LogWriter = JsWriter(js_log);
pub const ErrorWriter = JsWriter(js_error);
pub const AlertWriter = JsWriter(js_alert);


/// Logs a message using the JS `console.log` function.
pub fn honeyLog(comptime fmt: []const u8, args: anytype) !void {
    var log_writer = LogWriter{};
    try log_writer.any().print(fmt, args);
}
```

It _was_ wasteful to create a new `LogWriter` for every call as we didn't need more than a single instance at a time.

Regardless, you can see the problems + the use of a (now deprecated) `std.io.AnyWriter`.

In 0.15, this has been deprecated entirely now that (thankfully) `std.io.Writer` is a fully concrete type. This means we needed to find a way to integrate the intrusive interfaces while maintaining a similar API.

### TODO
Continue writing about the solution to this problem and our new replacement.
