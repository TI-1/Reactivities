import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../lib/schemas/loginSchema";
import { useAccount } from "../../lib/hooks/useAccount";
import { Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";

export default function LoginForm() {
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<loginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: loginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || "/activities");
      },
    });
  };
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        gap: 3,
        maxWidth: "md",
        mx: "auto",
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color="secondary.main"
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign in</Typography>
      </Box>
      <TextInput label="Email" control={control} name="email" />
      <TextInput
        label="Password"
        control={control}
        name="password"
        type="password"
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Login
      </Button>
      <Typography sx={{ textAlign: "center" }}>
        {" "}
        Don't have an account?
        <Typography
          sx={{ ml: 2 }}
          component={Link}
          to="/register"
          color="primary"
        >
          Sign Up
        </Typography>
      </Typography>
    </Paper>
  );
}
